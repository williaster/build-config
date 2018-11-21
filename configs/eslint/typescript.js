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
        "no-restricted-globals": "off",
        "no-undef": "off",
        "no-unused-vars": "warn", // Temp (false positives: https://github.com/nzakas/eslint-plugin-typescript/issues/90)

        // IMPORT
        "import/extensions": [
          "error",
          "never",
          {
            json: "always"
          }
        ],
        "import/named": "off",
        "import/no-cycle": "off",
        "import/no-named-as-default": "off",

        // REACT
        "react/destructuring-assignment": "off",
        "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
        "react/no-unused-prop-types": "off",
        "react/prefer-stateless-function": "off",
        "react/prop-types": "off",

        // TYPESCRIPT
        "typescript/adjacent-overload-signatures": "error",
        "typescript/class-name-casing": "error",
        "typescript/member-delimiter-style": "error",
        "typescript/member-ordering": "off", // Prefer react/sort-comp
        "typescript/no-angle-bracket-type-assertion": "error",
        "typescript/no-empty-interface": "error",
        "typescript/no-array-constructor": "error",
        "typescript/no-triple-slash-reference": "error",
        "typescript/no-parameter-properties": "error",
        "typescript/no-unused-vars": "warn",
        "typescript/no-use-before-define": "error",
        "typescript/prefer-namespace-keyword": "error",
        "typescript/type-annotation-spacing": "error"
      }
    }
  ]
};
