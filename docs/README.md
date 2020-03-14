#### Bạn là dân chuyên Back End, bạn chưa bao giờ làm Front End hay bạn đã từng làm Front End nhưng chỉ cho những dự án nhỏ chỉ chạy vài tháng, team size 5 đến 10 người ...

#### Bạn đã bao giờ đặt câu hỏi là: làm Front End ở một đội tầm 50+ người, dự án chạy trong vài năm thì người ta làm như thế nào chưa? phải chăng họ chỉ dùng các tools được cung cấp sẵn để generate ra project rồi code và code, ... Tất nhiên là không rồi 😁😁😁

#### OK ở loạt bài viết này mình sẽ trình bày, thảo luận về quy trình phát triển phần mềm, các skills, cách tư duy mà một Dev Front End nên có để làm tốt công việc của mình.


### 📖 Chúng ta sẽ đi qua từng nội dung sau:
1. Khởi tạo dự án `ReactJS` với `Webpack`.
2. Unit Test ở Front End với `Karma`
3. Code coverage với `Istanbul`
4. Ứng dụng mẫu `User Management`, Build và Deploy với `Firebase Hosting`
5. Automation Test (AUT) với `Puppeteer`.

Một số khái niệm bạn nên có trước khi đọc tiếp bài viết:
- [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application): hay còn gọi là SPA, đây là một khái niệm mới về phát triển ứng dụng web, khác biệt cơ bản với cách truyền thống trước đây là ở trang web SPA bạn sẽ không thấy trang bị load lại khi thực hiện một thao tác nào đó như trước kia. Thực chất mọi thao tác của người dùng được thực hiện ở phía sau, nội dung mới sẽ được hiển thị khi có kết quả trả về từ phía server.
- [NodeJS](https://en.wikipedia.org/wiki/Node.js): là một ngôn ngữ lập trình, là môi trường chạy code Javascript ở phía server.
- [ReactJS](https://en.wikipedia.org/wiki/React_(web_framework)): là một framework để làm ứng dụng web dạng SPA được phát triển bởi Facebook.
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html): là một tool để khởi tạo ứng dụng SPA với ReactJS cho những bạn mới làm quen với ReactJS.
- [Webpack](https://webpack.js.org/): là một thư viện để đóng gói mã nguồn, nén mã nguồn, mã hóa mã nguồn, lazy loading, ... 
- [Babel](https://en.wikipedia.org/wiki/Babel_(transcompiler)): là một trình chuyển đổi code từ định dạng cao ES6+ về định dạng thấp hơn để cho các trình duyệt có thể hiểu và thực thi tốt nhất.

# 🌴 Khởi tạo dự án với ReactJS và Webpack
Thông thường khi bắt đầu một dự án ReactJS thì bạn nghĩ ngay đến các [tools hỗ trợ bạn tạo dự](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains/) án ngay những bước đầu tiên như: `create-react-app`,... việc sử dụng công cụ nó thuận lợi cho người bắt đầu nhưng không thực sự cần cho các dự án lớn.

**Ưu điểm**: Nó giúp bạn tạo 1 dự án ReactJS rất nhanh, chỉ một dòng lệnh là xong, nó sẽ đóng gói tất cả những thư viện mà tool đó cho là cần thiết để giúp bạn bắt đầu dự án, cũng như cung cấp các scripts để dev, build dự án.

**Nhược điểm**: Rất khó tùy biến, phức tạp và cần nhiều thời gian để tùy biến. Tool chỉ tạo code cho cấu hình chung, không cho 1 trường hợp cụ thể nào đó, nên để làm cho dự án chạy được với môi trường công ty, khách hàng thì chúng ta cần tùy biến nhiều thứ nữa.

Do đó trong các dự án lớn người ta thường xây dựng từ đầu tất cả những gì họ cần thay vì dựa vào một tool nào đó. Phần này mình sẽ trình bày cách dựng dự án ReactJS từ đầu với Webpack, một trong những thư viện đình đám trong việc đóng gói mã nguồn ở thời điểm viết bài này. Ngoài Webpack ra thì bạn cũng có nhiều lựa chọn khác như Browserify, Gulp, Grunt, ... bạn tìm hiểu thêm nếu muốn.

### Khởi tạo và cài đặt thư viện
```sh
# Tạo thư mục dự án, khởi tạo dự án
cd $PROJECT_HOME
mkdir FE-UserManagement
npm init

# Cài đặt thư viện webpack
# Thư viện này giúp bạn đóng gói, mã hóa, nén toàn bộ ứng dụng thành 1 / nhiều file nhỏ để deploy lên môi trường thực.
# --save-dev: có nghĩa là các thư viện này chỉ cài đặt ở môi trường phát triển, môi trường thực không dùng đến, các build tool sẽ dựa
# vào đó để biết cần đóng gói những thư viện nào.
npm i webpack webpack-cli --save-dev

# Cài đặt Babel, bạn cần thư viện này để chuyển các mã code ở các phiên bản cao về ES5 và biên dịch code ReactJS sang Javascript thuần túy.
# Lý do chúng ta cần chuyển về phiên bản ES5 là các trình duyệt chưa hỗ trợ đầy đủ tính năng của các phiên bản cao hơn.
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

# Cài đặt thư viện ReactJS
# --save: có nghĩa là bạn cần thư viện này khi chạy thực, yêu cầu các thư viện đóng gói kèm theo thư viện này.
npm i react react-dom -save

# Cài plugins cho webpack, webpack có rất nhiều plugins đi cùng, đây chỉ là một trong những thứ đó
npm i html-webpack-plugin --save-dev

# Thư viện này dùng để khởi tạo server ở local. Server ở phía môi trường DEV là bắt buộc trong quá trình phát triển dự án, 
# nó sẽ giúp chúng ta tạo 1 server tạm như môi trường thực, deploy code và giúp chúng ta có thể xem được code của mình hoạt 
# động như thế nào
npm i webpack-dev-server --save-dev

# Cài các bộ loader khác cho webpack để đọc file css, scss, img, html, ... bạn cần gì thì cứ thêm vào
npm i style-loader css-loader sass-loader node-sass --save-dev
```
Tips:
> Ở đây mình tách ra từng lệnh để tiện giải thích, bạn có thể gom các thư viện vào cùng một câu lệnh install để đỡ mất thời gian.

OK việc cài đặt như vậy là tạm đủ rồi bây giờ mình cấu hình cho nó chạy nhé:

#### Cấu hình Babel:
Việc cấu hình Babel khá đơn giản, bạn tạo 1 file `.babelrc` ở thư mục gốc của dự án $PROJECT_HOME với nội dung sau
```json
{
    "presets": [
        "@babel/env",
        "@babel/react"
    ]
}
```

#### Cấu hình webpack:
File cấu hình chính của webpack là `webpack.config.js`, bạn tạo ra file này và đặt ngay thư mục $PROJECT_HOME của dự án với nội dung sau
```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    // Điểm bắt đầu để webpack phân tích thư viện, code, ... của dự án
    entry: "./src/index.js",
  
    // Cài đặt đầu ra của dự án khi chạy build
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

    // test hỗ trợ regex để bạn viết query
    module: {
        rules: [
            // Cài đặt này nghĩa là sẽ dùng thư viện babel-loader để đọc các file js và jsx
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            
            // Các file css và scss thì dùng css-loader và sass-loader
            {
                test: /\.(css|s[ac]ss)$/i, 
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                          implementation: require('node-sass'),
                        },
                    }
                ]
            },
            
            // Các file html thì dùng html-loader
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },

    // Khai báo các plugins cho webpack biết
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};
```

#### Thêm scripts vào `package.json`
```json
"scripts": {
    "start": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
}
```
- `start`: Dùng để chạy server phía local, nó sẽ tự động biên dịch, deploy mã nguồn và server tạm cho bạn kiểm thử
- `build`: Dùng để đóng gói dự án chạy ở môi trường thực, các file sẽ được mã hóa, nén, ... bởi webpack

OK về cấu hình bạn cần vậy là đủ, bạn thử tạo ra một file `src/index.js` rồi chạy thử xem nó hoạt động thế nào nhé, hoặc bạn có thể clone bài mẫu ở đây
```
cd $PROJECT_HOME

# Lệnh này sẽ checkout duy nhất branch InitWebpack 
git clone --single-branch --branch InitWebpack https://github.com/lapth/FE-User-Management.git

cd FE-User-Management
```

#### Chạy thử ở local
```sh
npm run start
```
Sau khi chạy server xong bạn bật browser ở địa chỉ [http://localhost:8080/](http://localhost:8080/) để xem kết quả, nó như thế này
![](https://usermanagement-sample.firebaseapp.com/images/InitProject_Local_UI.png)

**Tips**
> Nếu bạn muốn tự bật Browser thì thêm tham số `--open`
> Nếu bạn muốn chỉ rebuild những module được thay đổi thôi thì thêm tham số `--hot`

#### Build ứng dụng
```sh
npm run build
```
Các file output sẽ được tạo ra trong thư mục `dist`, nó như thế này:
![](https://usermanagement-sample.firebaseapp.com/images/InitProject_Local_Build.png)

🤠🤠🤠 OK quá trình khởi tạo dự án với webpack tạm thời hoàn thành 🤠🤠🤠

# 🌴 Unit Test ở Front End với Karma
Lại là Unit Test 😂😂😂, mình giám chắc hơn 50% bạn đọc bài này đều ghét cay ghét đắng UT. Mình cũng từng như vậy, những năm đầu đời nghề làm Dev mình cũng rất ghét UT, sau vài năm thì không còn ghét nữa vì nó là việc phải làm 🤣🤣🤣.

UT là việc kiểm thử code đã viết ra ở giai đoạn phát triển, nó có thể viết trước, viết sau hay cùng viết với code chính của một chức năng nào đó, nó tùy thuộc vào dự án bạn đang làm chọn phương án nào.

**Một số khái niệm về UT:**
- [Unit Test](https://en.wikipedia.org/wiki/Unit_testing): Khái niệm cơ bản về Unit Test
- [Unit Testing Tutorial: What is, Types, Tools, EXAMPLE](https://www.guru99.com/unit-testing-guide.html) Các khái niệm khác liên quan đến test một sản phẩm.
- [Mocha](https://mochajs.org/): Là 1 test framework, tích hợp tốt với NodeJS và cả Browser. Đặc điểm của Framework này là cho phép bạn tùy biến các công cụ liên quan như mocking, assertion, ... dễ dàng.
- [Chai](https://www.chaijs.com/): Thư viện hỗ trợ tạo các assertion khi viết test case.
- Spy, Stub, Mock: Là các cách để tạo dữ liệu ảo, hàm ảo, service, ... ảo cho đầu vào của 1 test case, các bạn đọc thêm [Sinon](https://sinonjs.org/)
- [Jest](https://jestjs.io/): Cũng là test framework được cung cấp bởi Facebook. Jest tích hợp khá nhiều cung cụ cho việc viết Unit Test, với Jest thì bạn không cần cài đặt thêm gì nhiều. Thông thường bạn chỉ cần chọn Jest hoặc bộ 3 Mocha, Chai, Sinon là đủ cho việc viết UT.
- [Enzyme](https://enzymejs.github.io/enzyme/): Bộ công cụ khá tốt để viết UT cho React Component.
- [JSDom](https://github.com/jsdom/jsdom/blob/master/README.md): Là bộ mô phỏng trình duyệt thực như Chrome, Firefox, ... với nhiều hạn chế về chức năng. Ưu điểm của nó là nhanh hơn trình duyệt thực. Các testing framework ở phía FrontEnd thường tích hợp với thư viện này cho việc chạy test cases.
- [Karma](http://karma-runner.github.io/4.0/intro/how-it-works.html): Test Runner, hỗ trợ chạy UT trên nhiều Browser THỰC khác nhau, report, debug, ...

**Nếu bạn đọc hết các link trên thì quá đủ để hiểu UT rồi đó, còn đây là khái niệm của mình về UT:**
- Nó là 1 đoạn code để test các chức năng mình đã làm ra.
> Ví dụ: bạn viết 1 hàm để in chữ "Hello World", làm sao bạn giám chắc hàm đó chạy đúng mà không phải chạy thử ứng dụng để kiểm tra? Viết UT là một trong các cách bạn có thể làm.
- UT để đảm bảo code của mình chạy đúng như mình mong muốn trước khi chuyển qua các giai đoạn khác như Manual test, Deployment, ... thường sẽ tốn rất nhiều thời gian để sửa lỗi mà bạn đã tạo ra so với UT.
> Ví dụ:
>
> Dự án của bạn có 2 công đoạn là Code + UT và Manual Test (được thực hiện bở đội Tester).
>
> Giả sử bạn code 1 hàm A(), bạn viết UT không cẩn thận để phát hiện hết các lỗi cần thiết.
>
> Đến công đoạn Manual Test, bạn Tester phát hiện ra, report bug đó lên hệ thống, các PO, PM vào xem và đánh giá, assign lại cho bạn hay ai đó khác để fix.
>
> 😱 Dự án cần rất nhiều công sức để giải quyết bug đó so với thời điểm viết UT.

- UT là để một người nào đó sau vài năm khi vào bảo trì (maintain) sản phẩm của bạn, dù không hiểu hết các chức năng bạn đã viết là gì, nhưng vẫn giám chắc chức năng mới mà người đó viết không làm hỏng các chức năng mà bạn viết.

- UT là để kiểm thử các trường hợp rất khó phát hiện ở môi trường thực. Với UT bạn có thể tạo những code giả, dữ liệu giả để kiểm thử các chức năng như vậy thay vì đợi dữ liệu thực để xem nó hoạt động thế nào.
> Ví dụ:
>
> Ứng dụng bạn có 1 chức năng là cứ sau 24 giờ các thông số sẽ được thiết lập lại thành các giá trị mặc định.
>
> Trong trường hợp như vậy để biết ứng dụng chạy đúng hay không trong môi trường thực khá là mất thời gian, tuy nhiên việc đó khá đơn giản với UT.

- Để cãi lại với Dev khác, code mình làm ra hoàn toàn đúng như kịch bản 😘.
> Ví dụ:
> 
> Dự án bạn có 1 chức năng được phát triển bởi 3 người cùng lúc với 3 hàm khác nhau. 
>
>- Func 1 là lấy thông tin đầu vào
>- Func 2 là xử lý logic của thông tin đầu vào
>- Func 3 là lưu thông tin đó vào DB
>
> Ở đây bạn thấy sự phụ thuộc của 3 hàm này với nhau. Như vậy làm sao bạn phát triển được Func 2 tốt mà không bị ảnh hưởng bởi tiến độ cũng như output của Func 1? UT là một trong các cách bạn có thể làm để giải quyết vấn đề đó, bạn có thể giả dữ liệu của Func 1 để kiểm thử Func 2 mình đang làm để đảm bảo Func 2 chạy đúng như mong muốn.

- Và còn rất nhiều trường hợp bạn có thể giải quyết với UT nhưng UT nó có **nhược điểm là nó sẽ mất thêm khoảng từ 10% -> 25% thời gian làm 1 task**, nên khi estimate bạn nên nhớ cộng con số này vào để tránh OT, ON nhé 😂😂😂


**Tại sao là "Unit Test ở Front End với Karma"**

1. Bạn cần biết rằng: web application là ứng dụng được chạy dựa trên các trình duyệt và bản thân ứng dụng đó chứa rất nhiều code mà chỉ có trình duyệt mới hiểu. Do đó việc chạy UT bạn cũng phải dựa vào các trình duyệt để chạy chứ không phải chỉ dựa vào Framework như việc viết UT ở phía BackEnd được.

2. Các UT Framework (UT-F) ở phía FrontEnd thông thường không mặc định tích hợp việc chạy UT trên bất kỳ trình duyệt nào, mà là JSDom. Việc cấu hình để UT-F chạy với các trình duyệt khác nhau là hoàn toàn có thể, tuy nhiên nó không dễ dàng chút nào 😂😂😂, do đó mình giới thiệu đến các bạn thư viện Karma, một thư viện khá mạnh cho việc chạy UT với các trình duyệt khác nhau, report kết quả UT và hỗ trợ debug code của UT.

#### Cài đặt Unit Test với Karma
##### Cài UT Framework
```
npm i mocha chai --save-dev
```
> UT-F sẽ hỗ trợ chúng ta trong quá trình viết UT, nếu bạn thích UT-F nào khác thì các bạn có thể chọn nó.

##### Cài các thư viện Karma
```
npm i karma karma-chrome-launcher karma-firefox-launcher karma-cli karma-mocha karma-sourcemap-loader karma-webpack puppeteer --save-dev
```
- `Karma`, `Karma-cli`: Thư viện chính của Karma

- `*-laucher`: Giúp chúng ta có thể chạy UT được trên các Browser tương ứng như Chrome, Firefox, ...

- `puppeteer`: Bộ Chromium phát triển bởi Google, chúng ta sẽ nói nhiều hơn ở phần `Automation Test`.

#### Cấu hình dự án
- Bạn thêm dòng này vào `webpack.config.js` để có thể thấy source code gốc khi debug ở môi trường DEV. Bạn xem thêm tài liệu [Devtool](https://webpack.js.org/configuration/devtool/) cho các tham số.
```javascript
module.exports = {
    devtool: 'inline-source-map',
}
```

- Bạn thêm mới file `karma.conf.js` ở thư mục gốc của dự án $PROJECT_HOME, đây là file cấu hình chính để chạy Karma

```javascript
// Lấy lại cấu hình webpack thay vì viết mới
var webpackConfig = require('./webpack.config.js');

// Puppeteer cần tham số này để chạy
process.env.CHROME_BIN = require('puppeteer').executablePath()

// Cấu hình Karma
module.exports = function (config) {
    config.set({
        // Framework sử dụng ở bài này là mocha, nếu bạn sử dụng fw khác, có thể thêm vào
        frameworks: ['mocha'],

        port: 9876, // Port chạy debug
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false, // True nghĩa là tự lắng nghe các file thay đổi để chạy lại
        // browsers: ['Chrome', 'Firefox'],
        // Bạn muốn hiểu Headless là gì thì có thể đọc ở đây: https://developers.google.com/web/updates/2017/04/headless-chrome
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
        singleRun: false, // Chạy một lần rồi thoát luôn hay chờ thay đổi để chạy lại. Ở mode PRO bạn cần đặt nó là true
        autoWatchBatchDelay: 300,
        
        // Danh sách các file được load vào Browser trong quá trình chạy test
        // Bạn xem tài liệu http://karma-runner.github.io/4.0/config/configuration-file.html phần File Patterns để biết cú pháp tìm files
        files: [
            'test/suites/test-suite.js',
            // 'test/**/*-Test.js',
		],

        // Tiền xử lý trước khi chạy
        preprocessors: {
            'test/suites/test-suite.js': ['webpack', 'sourcemap']
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
    "test-normal": "mocha --require @babel/register --exit test/**/*-Test.js"
  }
```
- `test`: Để chạy UT với Karma
- `test-normal`: Để chạy UT thuần với môi trường Node, ko tải UT lên bất kỳ trình duyệt nào. Hầu hết test cases sẽ lỗi.

#### Chuẩn bị source code
Bạn có thể lấy source từ đây để trải nghiệm
```
cd $PROJECT_HOME

# Lệnh này sẽ checkout duy nhất branch InitUnitTest 
git clone --single-branch --branch InitUnitTest https://github.com/lapth/FE-User-Management.git

cd FE-User-Management

npm install
```

#### Chạy test với Karma
```
npm run test
```
Kết quả chạy của bạn trông nó như thế này
![](https://usermanagement-sample.firebaseapp.com/images/InitUnitTest_Test_OK_Result.png)


#### Chạy test thuần
```
npm run test-normal
```
Cấu hình này để chứng minh phía FrontEnd, UT cần dựa vào Browser để chạy.

Kết quả chạy nó trông như thế này
![](https://usermanagement-sample.firebaseapp.com/images/InitUnitTest_Test_KO_Result.png)

#### Debug
Bạn cần chỉnh lại tham số ở file `karma.conf.js`
```json
autoWatch: true,
singleRun: false
```
Sau đó bạn chạy test với Karma như bình thương. Sau khi chạy với Karma xong:
1. Bạn bật Browser lên vào địa chỉ: http://localhost:9876/debug.html
2. `F12/Inspect` để vào DEV mode của Browser.
3. `^ + P`: Điền tên file UT muốn debug vào
4. Đặt Breakpoints dòng muốn debug
5. Refresh để chạy lại UT

Màn hình debug của bạn trông như sau:
![](https://usermanagement-sample.firebaseapp.com/images/InitUnitTest_Test_Debug.png)

#### Tạm kết
Vậy là bạn đã quen thuộc với UT rồi heng, hy vọng sau khi đọc bài viết này bạn không còn cảm thấy khó chịu khi viết UT nữa. Chúc các bạn thành công!

