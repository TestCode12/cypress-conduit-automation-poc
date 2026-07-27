import { defineConfig } from "cypress";

export default defineConfig({
  env: 
  {
      apiUrl: "https://api.realworld.show",
  },
  e2e: {

    baseUrl: "https://demo.realworld.show",
    setupNodeEvents(on, config) 
    {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true
  },
});
