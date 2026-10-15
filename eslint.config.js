const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: globals.browser,
    },
  },
  {
    files: ["eslint.config.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
  },
];
