### Khởi tạo ứng dụng ReactJS từ đầu với webpack
Ở phần này mình sẽ trình bày những vấn đều sau

1. Khởi tạo dự án và cài đặt các thư viện
2. Giải thích cách bắt đầu dự án với webpack


**PROJECT_HOME**: là thư mục gốc chứa dự án 

`--save-dev`: Nghĩa là chỉ sử dụng ở môi trường DEV, môi trường chạy thực không sử dụng những thư viện này.

`--save`: Nghĩa là những thư viện cần khi chạy ứng dụng ở môi trường thực.

## Khởi tạo dự án
```
cd $PROJECT_HOME
mkdir FE-UserManagement
npm init

# Cài đặt thư viện webpack
npm i webpack webpack-cli --save-dev

# Cài đặt Babel, bạn cần thư viện này để chuyển các mã code ở các phiên bản cao về ES5 và biên dịch code React sang javascript
# Lý do chúng ta cần chuyển về phiên bản ES5 là các trình duyệt chưa hỗ trợ đầy đủ các phiên bản cao hơn.
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

# Cài đặt thư viện ReactJS
npm i react react-dom -save

# Cài thư viện sinh mã html
npm i html-webpack-plugin --save-dev

# Thư viện này dùng để khởi tạo server ở local. Server ở phía môi trường DEV là bắt buộc trong quá trình phát triển dự án
npm i webpack-dev-server --save-dev

# Cài các bộ loader khác cho webpack để đọc file css, scss
npm i style-loader css-loader sass-loader node-sass --save-dev
```

## Cấu hình để chạy với Webpack
- File `.babelrc` dùng để cấu hình Babel, bạn có thể tạo với nội dung như sau
```
{
    "presets": [
        "@babel/env",
        "@babel/react"
    ]
}
```
- File `webpack.config.js` để cấu hình Webpack
```
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
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

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};
```
- Thêm scripts vào `package.json`
```
"scripts": {
    "start": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
}
```

## Thử chạy ứng dụng ở local
```
npm run start
``` 
Sau khi chạy server xong bạn bật browser ở địa chỉ http://localhost:8080/ để xem kết quả

**Tips**

- Nếu bạn muốn tự bật Browser thì thêm tham số `--open`
- Nếu bạn muốn chỉ rebuild những module được thay đổi thôi thì thêm tham số `--hot`

## Build ứng dụng
```
npm run build
``` 
Các file output sẻ được tạo ra trong thư mục `dist`
