// Đây là cách cài đặt test suite, bạn xem thêm tài liệu của Karma

var context = require.context('../', true, /-test\.(js|jsx)$/i);
context.keys().forEach(context);
