const _ = require('lodash');
const path = require('path');
const webpackConfig = _.assign({},
    require('./webpack.config.js'), 
    {
        mode: 'development',
    }
);

// Add more loader for UT only
webpackConfig.module.rules.push(
    {
        test: /\.(js|jsx)$/i,
        include: path.resolve("src"),
        exclude: path.resolve(__dirname, "node_modules"),
        enforce: "post",
        use: {
            loader: "istanbul-instrumenter-loader",
            options: { esModules: true },
        },
    }
);

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['mocha'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,   // True means: watching for changes and re-running
        // browsers: ['Chrome', 'Firefox'],  // Non headless mode
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],  // Headless mode
        singleRun: true,    // If true, run one time then exit otherwise keeping running
        autoWatchBatchDelay: 300,
        
        files: [
            'test/suites/helloworld-test-suite.js',
            // 'test/**/*-Test.js',
            'src/**/*.{js,jsx}'
        ],
        
        // list of files to exclude
        exclude: [],

        preprocessors: {
            'test/suites/helloworld-test-suite.js': ['webpack', 'sourcemap'],
            // 'test/**/*-Test.js': ['webpack', 'sourcemap']

            'src/**/*.{js,jsx}': ['webpack'],
        },

        reporters: ['progress', 'coverage-istanbul'], //report results in this format
        
        coverageIstanbulReporter: {
            dir : 'coverage/',
            // ttps://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
            reports: ['html', 'text-summary'],
            'report-config': {
                // https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
                html: {
                    // outputs the report in ./coverage/html
                    subdir: 'html'
                }
            },
            // enforce percentage thresholds
            // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
            thresholds: {
                emitWarning: true, // set to `true` to not fail the test command when thresholds are not met
                // thresholds for all files
                global: {
                    statements: 80,
                    lines: 80,
                    branches: 80,
                    functions: 80
                },
                // thresholds per file
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
        
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};
