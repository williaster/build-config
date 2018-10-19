const { MIN_IE_VERSION, MIN_NODE_VERSION, IGNORE_PATHS } = require('./constants');

const { context, tool } = process.beemo;
const { args } = context;
const env = process.env.NODE_ENV;

const plugins = [
  '@babel/plugin-proposal-export-default-from',
  ['babel-plugin-transform-dev', { evaluate: false }],
];

const presetEnvOptions = {
  loose: true,
  modules: args.esm ? false : 'commonjs',
  shippedProposals: true,
  targets: args.node ? { node: MIN_NODE_VERSION } : { ie: MIN_IE_VERSION },
  useBuiltIns: 'usage',
};

if (env === 'test') {
  presetEnvOptions.modules = 'commonjs';
  presetEnvOptions.targets = { node: 'current' };
}

const presets = [['@babel/preset-env', presetEnvOptions], '@babel/preset-react'];

if (args.minify) {
  if (tool.config.babel && tool.config.babel.minify) {
    // add config from tool
    presets.push(['minify', tool.config.babel.minify]);
  } else {
    presets.push('minify');
  }
}

module.exports = {
  ignore: [...IGNORE_PATHS, '__tests__', '__mocks__'],
  plugins,
  presets,
};
