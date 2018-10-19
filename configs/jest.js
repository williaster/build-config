const fs = require('fs');
const path = require('path');
const { EXTS, EXT_PATTERN, IGNORE_PATHS } = require('./constants');

const { context } = process.beemo;
const { args } = context;
const setupFiles = [];

const testRoot = args['test-dir'] || 'test';
const setupFilePath = path.join(process.cwd(), args.setup || `./${testRoot}/setup.js`);
if (fs.existsSync(setupFilePath)) {
  setupFiles.push(setupFilePath);
}

if (args.react) {
  setupFiles.push(path.join(__dirname, './jest/enzyme.js'));
}

module.exports = {
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [...IGNORE_PATHS],
  coverageReporters: ['lcov'],
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: EXTS.map(ext => ext.slice(1)), // no period
  setupFiles,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [`**/?(*.)+(spec|test).${EXT_PATTERN}`],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: true,
};
