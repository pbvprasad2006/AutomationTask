const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'cypress/integration/testcases/*.js',
    "reporter": "mochawesome",
    "reporterOptions": {
        "reportDir": "cypress/report/mocha-report",
        "overwrite": false,
        "html": false,
        "json": true,
        "timestamp": "mmddyyyy_HHMMss"
    }
  },
  
});
