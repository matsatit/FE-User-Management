var webpackConfig = require('./webpack.config.js');
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,   // True means: Keep running and watching for changes, debugging, ...
        // browsers: ['Chrome', 'Firefox'],  // Non headless mode
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],  // Headless mode
        singleRun: false,    // If true, run the browsers one by one
        autoWatchBatchDelay: 300,
        
        files: [
            'test/suites/helloworld-test-suite.js',
            // 'test/**/*-Test.js',
		],

        preprocessors: {
            'test/suites/helloworld-test-suite.js': ['webpack', 'sourcemap']
            // 'test/**/*-Test.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'], //report results in this format
        
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};
