#### Bạn là dân chuyên Back End, bạn chưa bao giờ làm Front End hay bạn đã từng làm Front End nhưng chỉ cho những dự án nhỏ chỉ chạy vài tháng, team size 5 đến 10 người ...

#### Bạn đã bao giờ đặt câu hỏi là: làm Front End ở một đội tầm 50+ người, dự án chạy trong vài năm thì người ta làm như thế nào chưa? phải chăng họ chỉ dùng các tools được cung cấp sẵn để generate ra project rồi code và code, ... Tất nhiên là không rồi 😁😁😁

#### OK ở loạt bài viết này mình sẽ trình bày, thảo luận về quy trình phát triển phần mềm, các skills, cách tư duy mà một Dev Front End nên có để làm tốt công việc của mình.

# 

### 📖 Chúng ta sẽ đi qua từng nội dung sau:
1. Khởi tạo dự án `ReactJS` với `Webpack`.
2. Unit Test ở Front End với `Karma`
3. Code coverage với `Istanbul`
4. Ứng dụng mẫu `User Management`, Build và Deploy với `Firebase Hosting`
5. Automation Test (AUT) với Puppeteer.

Một số khái niệm bạn nên có trước khi đọc tiếp bài viết:
- [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application): hay còn gọi là SPA, đây là một khái niệm mới về phát triển ứng dụng web, khác biệt cơ bản với cách truyền thống trước đây là ở trang web SPA bạn sẽ không thấy trang bị load lại khi thực hiện một thao tác nào đó như trước kia. Thực chất mọi thao tác của người dùng được thực hiện ở phía sau, nội dung mới sẽ được hiển thị khi có kết quả trả về từ phía server.
- [NodeJS](https://en.wikipedia.org/wiki/Node.js): là một ngôn ngữ lập trình, là môi trường chạy code Javascript ở phía server.
- [ReactJS](https://en.wikipedia.org/wiki/React_(web_framework)): là một framework để làm ứng dụng web dạng SPA được phát triển bởi Facebook.
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html): là một tool để khởi tạo ứng dụng SPA với ReactJS cho những bạn mới làm quen với ReactJS.
- [Webpack](https://webpack.js.org/): là một thư viện để đóng gói mã nguồn, nén mã nguồn, mã hóa mã nguồn, lazy loading, ... 
- [Babel](https://en.wikipedia.org/wiki/Babel_(transcompiler)): là một trình chuyển đổi code từ định dạng cao ES6+ về định dạng thấp hơn để cho các trình duyệt có thể hiểu và thực thi tốt nhất.

# 🌴 Khởi tạo dự án với ReactJS và Webpack
Thông thường khi bắt đầu một dự án ReactJS thì bạn nghĩ ngay đến các [tools hỗ trợ bạn tạo dự](https://reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains) án ngay những bước đầu tiên như: `create-react-app`,... việc sử dụng tool nó thuận lợi cho người bắt đầu nhưng có những nhược điểm cho các dự án lớn.

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
Lại là Unit Test 😂😂😂, mình giám chắc hơn 50% bạn đọc bài này đều ghét cay ghét đắng UT. Mình cũng từng như vậy, 5 năm đầu đời nghề làm Dev mình cũng rất ghét UT, sau 5 năm thì không còn ghét nữa vì nó là việc phải làm 🤣🤣🤣.

**Ok vậy UT là cái thứ gì:**
- Nôm na nó là 1 đoạn code để test các chức năng mình đã làm ra.
> Ví dụ: bạn viết 1 hàm để in chữ "Hello World", làm sao bạn giám chắc hàm đó chạy đúng mà không phải chạy thử ứng dụng để kiểm tra, chỉ có thể thông qua UT.
- UT là code để test cho từng đơn vị (unit) code nhỏ nhất mình đã tạo ra.
> Ví dụ: bạn tạo ra một class, 1 file js, ... trong đó có nhiều hàm khác nhau, thì UT là code để test độc lập từng hàm trong file đó, UT không cho phép bạn test một hàm mà hàm đó vẫn còn phụ thuộc (depended) vào 1 hồm khác.
- UT để đảm bảo code của mình chạy đúng như mình mong muốn trước khi chuyển qua các giai đoạn khác như Deployment, Manual test, ... thường sẽ tốn rất nhiều thời gian để sửa lỗi mà bạn đã tạo ra so với UT.
- UT là để một người nào đó sau khi vào bảo trì (maintain) sản phẩm của bạn, dù không hiểu hết các chức năng bạn đã viết là gì, nhưng vẫn giám chắc chức năng mới mà người đó viết không làm hỏng các chức năng mà bạn viết.
- UT là để kiểm thử các trường hợp mà rất khó khó khó phát hiện ở môi trường thực. Với UT bạn sẽ tạo những code giả, dữ liệu giã để kiểm thử các chức năng như vậy thay vì đợi dữ liệu thực để xem nó hoạt động thế nào.
- ... và cuối cùng UT là để cải lại với Dev khác, code mình làm ra hoàn toàn đúng như kịch bản 😘