# @data-ui/build-config

Version-controlled build config for easy re-use and sharing 📝

### Install

```
npm install --save-dev @data-ui/build-config @beemo/core @beemo/cli
```

### Using drivers

This project is built with [🤖beemo](https://github.com/milesj/beemo), and therefore requires a `"beemo"` configuration block in your `package.json` with a list of drivers you want to enable. You can optionally configure drivers as shown below:

```
{
  "beemo": {
    "module": "@data-ui/build-config",
    "drivers": [
      "babel",
      {
        "driver": "eslint",
        "args": ["--color", "--report-unused-disable-directives"]
      },
      {
        "driver": "jest",
        "env": { "NODE_ENV": "test" }
      }
      "prettier"
    ]
  }
}
```

### Executing drivers
Executing a driver will initialize 🤖Beemo's pipeline, generate configuration files (e.g., it will generate a `.eslintrc` or `prettier.config.js`, and execute the underlying driver binary and logging to the console. 

> All arguments passed to Beemo are passed to the driver's underlying binary.

You may define these commands as scripts:

```
{
  "scripts": {
    "babel": "beemo babel ./src --out-dir ./lib",
    "eslint": "beemo eslint ./src ./tests",
    "jest": "beemo jest",
    "prettier": "beemo prettier --write \"./{src,tests}/**/*.{js,json,md}\""
}
```
