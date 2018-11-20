const extensions = [".ts", ".tsx", ".js", ".jsx", ".json"];

module.exports = {
  settings: {
    "import/extensions": extensions,
    "import/resolver": {
      node: {
        extensions
      }
    },
    "import/parsers": {
      "typescript-eslint-parser": [".ts", ".tsx"]
    }
  },

  overrides: [
    {
      parser: "typescript-eslint-parser",
      plugins: ["typescript"],
      files: ["*.{ts,tsx}"],
      rules: {
        // TypeScript support
        "no-unused-vars": ["warn", { vars: "all", args: "none", ignoreRestSiblings: true }],
        "import/extensions": [
          "error",
          "never",
          {
            json: "always"
          }
        ],
        "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
        "typescript/adjacent-overload-signatures": "error",
        "typescript/class-name-casing": "error",
        "typescript/member-delimiter-style": "error",
        "typescript/member-ordering": "error",
        "typescript/no-angle-bracket-type-assertion": "error",
        "typescript/no-empty-interface": "error",
        "typescript/no-array-constructor": "error",
        "typescript/no-triple-slash-reference": "error",
        "typescript/no-parameter-properties": "error",
        "typescript/no-unused-vars": "error",
        "typescript/no-use-before-define": "error",
        "typescript/prefer-namespace-keyword": "error",
        "typescript/type-annotation-spacing": "error",

        // Doesnt work with TypeScript
        "no-restricted-globals": "off",
        "no-undef": "off", // this is bad when ts + js are mixed, see https://github.com/eslint/typescript-eslint-parser/issues/77
        "import/no-cycle": "off",
        "import/named": "off",
        "react/destructuring-assignment": "off"
      }
    }
  ]
};
