#### Bạn là dân chuyên Back End, bạn chưa bao giờ làm Front End hay bạn đã từng làm Front End nhưng chỉ cho những dự án nhỏ chỉ chạy vài tháng, team size 5 đến 10 người ...

#### Bạn đã bao giờ đặt câu hỏi là: làm Front End ở một đội tầm 50 đến 100 người, dự án chạy trong vài năm thì người ta làm như thế nào chưa? phải chăng họ chỉ dùng các CLI được cung cấp sẵn trên mạng để generate ra project rồi code và code, ... Tất nhiên là không rồi 😁😁😁

#### OK ở bài viết này mình sẽ trình bày, thảo luận về các skills, cách tư duy mà một Front End Engineer nên có để làm tốt công việc của mình.
#

##### 📖 Nội dung bài viết:
**Nội dung bài viết này sẽ xoay quanh các vấn đề: Code, Unit Test, Build và Deploy, Automation Test, CICD và các Frameworks**

1. Khởi tạo dự án `ReactJS` với `Webpack`
2. Unit Test ở Front End với `Karma`
3. Code coverage với `Istanbul`
4. Ứng dụng mẫu `User Management`, Build và Deploy với `Firebase Hosting`
5. Automation Test (AUT) với Puppeteer.


# 🌴 Khởi tạo dự án với `ReactJS` và `Webpack`
Thông thường khi bắt đầu một dự án ReactJS thì bạn nghĩ ngay đến tools CLI hỗ trợ bạn tạo dự án ngay những bước đầu tiên như: `create-react-app`,...
**Ưu điểm**: của các tool này là nhanh, nó giúp bạn tạo 1 dự án ReactJS rất nhanh, chỉ một dòng lệnh là xong, nó sẽ đóng gói tất cả những thư viện mà tool đó cho là cần thiết để giúp bạn bắt đầu dự án, cũng như cung cấp các scripts để dev, build dự án.
**Nhược điểm**: của việc dùng tool là rất khó tùy biến nó, phức tạp và cần nhiều thời gian. Tool chỉ generate code cho cấu hình chung, không cho 1 trường hợp nào đó nên để làm cho dự án chạy được với môi trường công ty, khách hàng thì chúng ta cần tùy biến nhiều thứ nữa không đơn giản chỉ là generate ra và làm.

Do đó trong các dự án lớn người ta thường xây dựng từ đầu tất cả những gì họ cần thay vì dựa vào một tool nào đó. Phần này mình sẽ trình bày cách dựng dự án ReactJS từ đầu dựa vào Webpack nhé. Ngoài Webpack ra thì bạn cũng có nhiều lựa chọn khác như Browserify, Gulp, Grunt, ... bạn tìm hiểu thêm nếu muốn.

### Khỏi tạo và cài đặt thư viện
```sh
# Tạo thư mục dự án, khởi tạo dự án Node
cd $PROJECT_HOME
mkdir FE-UserManagement
npm init

# Cài đặt thư viện webpack
# --save-dev: có nghĩa là các thư viện này chỉ cài đặt ở môi trường phát triển, môi trường thực không dùng đến, các build tool sẽ dựa
# vào đó để biết cần đóng gói những thư viện nào.
npm i webpack webpack-cli --save-dev

# Cài đặt Babel, bạn cần thư viện này để chuyển các mã code ở các phiên bản cao về ES5 và biên dịch code ReactJS sang javascript.
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
Việc cấu hình Babel khá đơn giản, bạn tạo 1 file `.babelrc` đặt ngay thư mục $PROJECT_HOME là được
```json
{
    "presets": [
        "@babel/env",
        "@babel/react"
    ]
}
```

#### Cấu hình webpack:
File cấu hình chính của webpack là `webpack.config.js`, bạn tạo ra file này và đặt ngay thư mục $PROJECT_HOME của dự án
```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    // Điểm bắt đầu để webpack phân thư viện, mã, ... của dự án
    entry: "./src/index.js",
  
    // Cài đặt đầu ra của dự án khi chạy build
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

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

#### Thêm scripts để chạy vào `package.json`
```json
"scripts": {
    "start": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
}
```
- `start`: dùng để chạy server phía local, nó sẽ tự động biên dịch, deploy mã nguồn và server tạm cho bạn kiểm thử
- `build`: dùng để đóng gói dự án chạy ở môi trường thực, các file sẽ được ` mã hóa `, nén, ... bởi webpack

OK về cấu hình bạn cần vậy là đủ, bạn thử tạo ra một file `src/index.js` rồi chạy thử xem nó hoạt động thế nào nhé, hoặc bạn có thể clone bài mẫu ở đây
```
cd $PROJECT_HOME

git clone https://github.com/lapth/FE-User-Management.git

cd FE-User-Management

git checkout InitWebpack
```

#### Chạy thử ở local
```sh
npm run start
```
Sau khi chạy server xong bạn bật browser ở địa chỉ http://localhost:8080/ để xem kết quả, nó như thế này
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

