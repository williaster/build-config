# @data-ui/build-config

Version-controlled build config for easy re-use and sharing 📝

## Install

```
npm install --save-dev @data-ui/build-config
```

This project is built with [🤖beemo](https://github.com/milesj/beemo), and therefore requires a `"beemo"` entry in your `package.json` with a list of drivers you want to support:

```
{
  "beemo": {
    "module": "@data-ui/build-config",
    "drivers": [
      "eslint",
      "prettier",
      "jest",
      "babel"
    ]
  }
}
```
