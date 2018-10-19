import { IGNORE_PATHS } from './constants';

module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  ignore: [...IGNORE_PATHS, 'lerna.json', 'package.json', 'package-lock.json'],
  jsxBracketSameLine: false,
  printWidth: 100,
  proseWrap: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
