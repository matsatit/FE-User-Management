# Cài đặt Code Coverage
**Code Coverage**: Là một tiêu chuẩn trong việc viết UT, UT phải đáp ứng được các tiêu chuẩn đưa ra như số dòng được test, số nhánh được test, ... thì mới được gọi là pass.

Phần này chúng ta sẽ tìm hiểu làm sao xuất Code Coverage ra để xem.

# Cài đặt thư viện
Để tạo report Code Coverage chúng ta cần các thư viện sau
```
npm install istanbul-instrumenter-loader karma-coverage-istanbul-reporter --save-dev
```
Đây là thư viện giúp tạo ra report cũng như chèn code gốc vào report để xem.

# Cài đặt để chạy với Webpack
1. Cấu hình load các file source phục vụ cho report kết quả test

Thêm rule vào webpack config
```javascript
webpackConfig.module.rules.push(
    {
        test: /\.(js|jsx)$/i,
        include: path.resolve("src"), // Thư mục chứa source
        exclude: path.resolve(__dirname, "node_modules"),
        enforce: "post", // Luôn chạy rule này sau các rule đã định nghĩa
        use: {
            loader: "istanbul-instrumenter-loader",
            options: { 
                esModules: true // Cho phép chạy với code kiểu ES
            },
        },
    }
);
```

2. Thêm file nguồn vào cấu hình file của Karma
```json
files: [
    "src/**/*.{js,jsx}"
],
preprocessors: {
    "src/**/*.{js,jsx}": ["webpack"],
},
```

3. Cấu hình quá trình test và report
```javascript
reporters: ['progress', 'coverage-istanbul'], //Các kiểu report
        
coverageIstanbulReporter: {
    dir : 'coverage/', // Kết quả được lưu trữ ở thư mục này
    reports: ['html', 'text-summary'], // Xuất ra 2 kiểu này để xem
    'report-config': {
        html: {
            subdir: 'html'
        }
    },

    // Cấu hình % mã nguồn được test để xem pass hay fail
    thresholds: {
        emitWarning: true, // true thì không báo fail khi kết quả không đạt tiêu chuẩn đề ra
        
        // cấu hình chung cho toàn bộ file
        global: {
            statements: 80,
            lines: 80,
            branches: 80,
            functions: 80
        },
        // cấu hình cho từng file
        each: {
            statements: 80,
            lines: 80,
            branches: 80,
            functions: 80,
            overrides: {
                'src/components/**/*.js': {
                    statements: 50,
                    lines: 50,
                    branches: 50,
                    functions: 50,
                }
            }
        }
    },
},
```

