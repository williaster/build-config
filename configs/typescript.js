// Package: Run in root
// Workspaces: Run in each package (copied into each)
const path = require("path");

const { context, tool } = process.beemo;
const toolConfig = tool.config.settings || {};
const testDir = toolConfig.testDir || context.args.testDir || "test";

let include = ["./src/**/*", "./types/**/*"];
const typeRoots = ["./node_modules/@types"];

// When --noEmit is passed, we want to run the type checker and include test files.
// Otherwise, we do not want to emit declarations for test files.
if (context.args.noEmit) {
  include.push(`./${testDir}/**/*`);
}

// When --workspaces is passed, the tsconfig.json is copied into each
// workspace package instead of being referenced from the root. Because
// of this, we need to calculate relative paths from within each workspace
// package, so that we may resolve root node_modules and types correctly.
if (context.args.workspaces) {
  context.workspaces.forEach(wsPath => {
    const wsRelativeRoot = path.relative(wsPath, context.workspaceRoot);

    typeRoots.push(path.join(wsRelativeRoot, "node_modules/@types"));
    include.push(path.join(wsRelativeRoot, "types/**/*"));
  });

  // However, when running through Jest at the root, we need to find all packages.
  // Be sure not to break non-workspace enabled projects.
} else if (tool.package.workspaces) {
  include = [];

  tool.package.workspaces.forEach(wsPath => {
    const wsRelPath = wsPath.endsWith("/*") ? wsPath.slice(0, -2) : wsPath;

    include.push(path.join(wsRelPath, `./**/*`));
  });
}

module.exports = {
  compilerOptions: {
    allowSyntheticDefaultImports: true,
    declaration: true, // generates corresponding '.d.ts' file.
    declarationDir: "./lib",
    esModuleInterop: true, // Emit __importStar and __importDefault helpers for runtime babel ecosystem compatibility and enable --allowSyntheticDefaultImports for typesystem compatibility
    forceConsistentCasingInFileNames: true,
    jsx: "react",
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
    target: "esnext",
    typeRoots
  },
  include,
  exclude: ["node_modules"]
};
