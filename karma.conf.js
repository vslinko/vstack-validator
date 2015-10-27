/* eslint-disable no-var */

var path = require('path');

module.exports = function karma(config) {
  config.set({
    frameworks: ['mocha'],

    files: ['test/**/*Test.js'],

    preprocessors: {
      'test/**/*Test.js': ['webpack'],
    },

    reporters: ['progress', 'coverage', 'junit'],

    browsers: ['Firefox'],

    singleRun: true,

    coverageReporter: {
      reporters: [
        { type: 'html' },
        { type: 'lcov' },
      ],
    },

    junitReporter: {
      outputDir: 'junit',
    },

    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, include: path.resolve('test'), loader: 'babel' },
          { test: /\.js$/, include: path.resolve('src'), loader: 'isparta' },
        ],
      },
    },

    webpackMiddleware: {
      quiet: true,
    },
  });
};
