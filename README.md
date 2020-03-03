# Cài đặt Unit Test với Karrma
Trong phần này chúng ta sẽ đi qua các bước để thêm Unit Test vào cho dự án dựa trên thư viện Karma.

Tại sao phải là Karma: bởi vì các Unit Test framework thường sẽ không chạy code của bạn với Browser thực mà chạy với Browser ảo như PhantomJS hay JSDom. Karma sẽ hỗ trợ bạn chạy code Unit Test với Browser thực như Chrome, Firefox, ... 

Bạn có thể tham khảo thêm: http://karma-runner.github.io/4.0/config/browsers.html

# Thư viện cho Unit Test thông thường:
```
npm i mocha chai --save-dev
```
`Mocha`: Là Unit Test framework, sử dụng cả Front End, Back End, thư viện này sẽ giúp chúng ta viết các test cases cần thiết.

`Chai`: Thư viện này giúp chúng ta có thể viết assertion cho test cases.

`Sinon`: Thư viện cho việc Mocking đầu vào, bạn có thể tìm hiểu thêm, trong phạm vi bài này không sử dụng thư viện này. 

# Thư viện cho Karma
```
npm i karma karma-chrome-launcher karma-firefox-launcher karma-cli karma-mocha karma-sourcemap-loader karma-webpack puppeteer --save-dev
```
`Karma`, `Karma-cli`: Thư viện chính của Karma

`*-laucher`: Giúp chúng ta có thể chạy test được trên các Browser tương ứng như Chrome, Firefox, ...

`puppeteer`: Bộ Chromium phát triển bở Google, chúng ta sẽ nói nhiều hơn ở phần Automation test.

# Cấu hình dự án
- Bạn thêm dòng này vào `webpack.config.js` để có thể thấy source code và debug ở môi trường DEV
```javascript
module.exports = {
    devtool: 'inline-source-map',
}
```
- `karma.conf.js`
```javascript
var webpackConfig = require('./webpack.config.js');

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
    config.set({
        // Framework sử dụng ở bài này là mocha, nếu bạn sử dụng fw khác, có thể thêm vào
        frameworks: ['mocha'],

        port: 9876, // Port chạy debug
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false, // True nghĩa là tự lắng nghe các file test thay đổi để chạy lại
        // browsers: ['Chrome', 'Firefox'],
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
        singleRun: false, // Chạy một lần rồ thoát luôn hay chờ thay đổi để chạy lại
        autoWatchBatchDelay: 300,
        
        // Danh sách các file sẽ được load vào Browser để chạy test
        files: [
            'test/suites/helloworld-test-suite.js',
            // 'test/**/*-Test.js',
		],

        preprocessors: {
            'test/suites/helloworld-test-suite.js': ['webpack', 'sourcemap']
            // 'test/**/*-Test.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        
        // Cấu hình webpack
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};
```
- Thêm scripts vào `package.json`
```json
"scripts": {
    "test": "karma start",
    "test-normal": "mocha --exit test/**/*-Test.js"
  }
```
- `test`: Để chạy UT với Karma
- `test-normal`: Để chạy UT dựa vào mocha, ko tải UT lên bất kỳ trình duyệt nào. Hầu hết test cases sẽ lỗi.

# Chạy test với Karma
```
npm run test
```

# Chạy test với chỉ Mocha
```
npm run test-normal
```
Cấu hình này để chứng minh phía FrontEnd, UT cần dựa vào Browser để chạy.

# Debug
```javascript
autoWatch: true
```
Sau khi chạy với Karma xong, bạn bật Browser lên vào địa chỉ: http://localhost:9876/debug.html, sau đó F12/Inspect để vào DEV mode của Browser.

Với Chrome, nếu bạn không thấy các file source, bạn có thể nhấn `^ + P`, sau đó nhập tên file vào.
