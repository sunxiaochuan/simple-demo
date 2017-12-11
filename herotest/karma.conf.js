// Karma configuration
// Generated on Wed Nov 01 2017 18:31:25 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    //测试代码的路径
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // 断言库测试 BDD STAR  运行时的集成环境
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    //src 实际的代码
    //test 测试的代码
    // 要测试的文件
    files: [
        './src/**/*.js',
        './test/**/*.spec.js'
    ],


    // 需要排除的东西
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    //配置测试报表 覆盖率
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // 生成报表
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // 无头的浏览器 方便于未来的自动化测试
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // 要独立的运行在 PhantomJS
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
