const fs = require("fs");
const path = require("path");
const { EXTS, EXT_PATTERN, IGNORE_PATHS } = require("../constants");

const { context, tool } = process.beemo;
const { node, react, testDir = "test" } = tool.config.settings;
const { args } = context;
const setupFiles = [];

const setupFilePath = path.join(process.cwd(), args.setup || `./${testDir}/setup.js`);
if (fs.existsSync(setupFilePath)) {
  setupFiles.push(setupFilePath);
}

if (args.react || react) {
  setupFiles.push(path.join(__dirname, "./jest/enzyme.js"));
}

const roots = [];

if (tool.package.workspaces) {
  tool.package.workspaces.forEach(wsPath => {
    // eslint-disable-next-line no-magic-numbers
    const wsRelPath = wsPath.endsWith("/*") ? wsPath.slice(0, -2) : wsPath;

    // eg <rootDir>/packages
    roots.push(path.join("<rootDir>", wsRelPath));
  });
} else {
  roots.push("<rootDir>");
}

module.exports = {
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [...IGNORE_PATHS],
  coverageReporters: ["lcov"],
  globals: {
    __DEV__: true
  },
  moduleFileExtensions: EXTS.map(ext => ext.slice(1)), // no period
  roots,
  setupFiles,
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testMatch: [`**/?(*.)+(spec|test).${EXT_PATTERN}`],
  testURL: "http://localhost/",
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true
};
