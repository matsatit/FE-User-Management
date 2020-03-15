// Load source and test
// Ref: https://webpack.js.org/loaders/istanbul-instrumenter-loader/

var tests = require.context('../', true, /-test\.(js|jsx)$/i);
tests.keys().forEach(tests);

var sources = require.context('../../src/', true, /\.(js|jsx)$/i);
sources.keys().forEach(sources);
