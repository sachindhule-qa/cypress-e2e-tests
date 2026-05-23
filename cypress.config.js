const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // =============================================
  // Cypress E2E Configuration
  // Author: Sachin Dhule
  // =============================================

  e2e: {
    // Base URL - SauceDemo application
    baseUrl: "https://www.saucedemo.com",

    // Test files location
    specPattern: "cypress/e2e/**/*.cy.js",

    // Support file
    supportFile: "cypress/support/e2e.js",

    // Fixtures folder
    fixturesFolder: "cypress/fixtures",

    // Screenshots on failure
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",

    // Video recording
    video: true,
    videosFolder: "cypress/videos",

    // Viewport
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,

    // Retries on failure
    retries: {
      runMode: 1,
      openMode: 0
    },

    // Reporter
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      timestamp: "mmddyyyy_HHMMss"
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        log(message) {
          console.log(message);
          return null;
        }
      });
      return config;
    }
  }
});
