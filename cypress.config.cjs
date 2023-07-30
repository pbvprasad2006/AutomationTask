const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    specPattern:'cypress/integration/testcases/*.spec.js',
    "reporter": "mochawesome",
    "rollupConfigFile": "cypress/plugins/rollup.config.js",
    "chromeWebSecurity": false,
    "browser": "chrome",
    "reporterOptions": {
        "reportDir": "cypress/report/mocha-report",
        "overwrite": false,
        "html": false,
        "json": true,
        "timestamp": "mmddyyyy_HHMMss"
    }
  }
});
