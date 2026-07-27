import { defineConfig } from "cypress";

export default defineConfig
({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: 
  {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: 
  {
    baseUrl: "https://demo.realworld.show",
    setupNodeEvents(on, config) 
    {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
  },
});
