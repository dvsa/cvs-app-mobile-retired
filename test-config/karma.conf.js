const webpackConfig = require('./webpack.test.js');
module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-junit-reporter'),
      require('karma-phantomjs-launcher')
    ],
    files: [
      {
        pattern: './test-config/karma-test-shim.js',
        watched: true
      },
      {
        pattern: './src/assets/**/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ],
    proxies: {
      '/assets/': '/base/src/assets/'
    },
    preprocessors: {
      './test-config/karma-test-shim.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    webpackServer: {
      noInfo: true
    },
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: config.coverage
      ? ['kjhtml', 'dots', 'coverage-istanbul', 'junit']
      : ['kjhtml', 'dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['PhantomJS']
    // browsers: ['Chrome']
    browsers: ['ChromeHeadless']
  });
};
