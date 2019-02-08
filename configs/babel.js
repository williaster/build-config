const {
  MIN_IE_VERSION,
  MIN_NODE_VERSION,
  IGNORE_PATHS
} = require("../constants");

const { context, tool } = process.beemo;
const { args } = context;
const env = process.env.NODE_ENV;

const plugins = [
  "@babel/plugin-proposal-export-default-from",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",
  ["babel-plugin-transform-dev", { evaluate: false }]
];

const presetEnvOptions = {
  loose: true,
  modules: args.esm ? false : "commonjs",
  shippedProposals: true,
  targets: args.node ? { node: MIN_NODE_VERSION } : { ie: MIN_IE_VERSION },
  useBuiltIns: false
};

if (env === "test") {
  presetEnvOptions.modules = "commonjs";
  presetEnvOptions.targets = { node: "current" };
  plugins.push([
    "@babel/plugin-transform-runtime",
    {
      helpers: true,
      regenerator: true,
      useESModules: !!context.args.esm
    }
  ]);
}

const presets = [
  ["@babel/preset-env", presetEnvOptions],
  "@babel/preset-react"
];

if (args.minify) {
  presets.push([
    "minify",
    {
      removeUndefined: false,
      evaluate: false,
      builtIns: false,
    }
  ]);
}

if (tool.config.drivers.includes("typescript")) {
  presets.push("@babel/preset-typescript");
  plugins.push("babel-plugin-typescript-to-proptypes");
}

module.exports = {
  ignore: [...IGNORE_PATHS, "__tests__", "__mocks__"],
  plugins,
  presets
};
