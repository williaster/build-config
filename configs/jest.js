const fs = require('fs');
const path = require('path');
const { EXTS, EXT_PATTERN, IGNORE_PATHS } = require('./constants');

const { context, tool } = process.beemo;
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

const roots = [];
const coveragePathIgnorePatterns = [];

if (tool.package.workspaces) {
  tool.package.workspaces.forEach(wsPath => {
    // eslint-disable-next-line no-magic-numbers
    const wsRelPath = wsPath.endsWith('/*') ? wsPath.slice(0, -2) : wsPath;

    // eg <rootDir>/packages
    roots.push(path.join('<rootDir>', wsRelPath));

    IGNORE_PATHS.forEach(ignorePath => {
      // eg <rootDir>/packages/*/node_modules/
      // include <rootDir> so that coverage is not affected by paths on different systems eg travis
      coveragePathIgnorePatterns.push(path.join('<rootDir>', wsPath, ignorePath));
    });
  });
} else {
  roots.push('<rootDir>');

  IGNORE_PATHS.forEach(ignorePath => {
    coveragePathIgnorePatterns.push(path.join('<rootDir>', ignorePath));
  });
}

module.exports = {
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns,
  coverageReporters: ['lcov'],
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: EXTS.map(ext => ext.slice(1)), // no period
  roots,
  setupFiles,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [`**/?(*.)+(spec|test).${EXT_PATTERN}`],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: true,
};
