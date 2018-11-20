// Package: Run in root
// Workspaces: Run in each package (copied into each)
const { context, tool } = process.beemo;
const toolConfig = tool.config.settings || {};
const testDir = toolConfig.testDir || context.args.testDir || "test";

const compilerOptions = {
  allowSyntheticDefaultImports: true,
  declaration: true, // generates corresponding '.d.ts' file.
  esModuleInterop: true, // Emit __importStar and __importDefault helpers for runtime babel ecosystem compatibility and enable --allowSyntheticDefaultImports for typesystem compatibility
  forceConsistentCasingInFileNames: true,
  lib: ["dom", "esnext"],
  module: "commonjs",
  moduleResolution: "node",
  noEmitOnError: true,
  noImplicitReturns: true,
  noImplicitThis: true,
  noImplicitAny: true,
  noUnusedLocals: true,
  outDir: "./lib",
  pretty: true,
  removeComments: false,
  strict: true,
  target: "esnext"
  // possibly add typeRoots in the future
};

if (context.args.react || toolConfig.react) {
  compilerOptions.jsx = "react";
}

let include = ["./src/**/*", "./types/**/*"];

// When --noEmit is passed, we want to run the type checker and include test files.
// Otherwise, we do not want to emit declarations for test files.
if (context.args.noEmit) {
  include.push(`./${testDir}/**/*`);
}

// When --workspaces is passed, this config is copied into each package, so use local paths.
// However, when running through Jest at the root, we need to find all packages.
// Be sure not to breat non-workspace enabled projects.
if (!context.args.workspaces && tool.package.workspaces) {
  include = include.map(path => `./packages/*${path.slice(1)}`); // no period
}

module.exports = {
  compilerOptions,
  include,
  exclude: ["node_modules"]
};
