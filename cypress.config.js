const { defineConfig } = require("cypress");
const gmailTester = require("gmail-tester");
const { registerAIOTestsPlugin } = require('cypress-aiotests-reporter/src');
const path = require("path");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dealer.carselfinspection.com/engine/",
    setupNodeEvents(on, config) {
      
      on("task", {
        "gmail:get-messages": async (args) => {
          const messages = await gmailTester.get_messages(
            path.resolve(__dirname, "credentials.json"),
            path.resolve(__dirname, "token.json"),
            args.options
          )

          return messages
        }
      })
      
      require("cypress-fail-fast/plugin")(on, config);
      return config;
    },

    video: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalSkipDomainInjection: [
      '*.salesforce.com',
      '*.force.com',
      '*.google.com',
    ],
  },
});