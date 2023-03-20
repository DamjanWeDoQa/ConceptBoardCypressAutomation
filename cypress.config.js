const { defineConfig } = require("cypress");
const { merge } = require('lodash')

module.exports = (on, config) => {
  if (config.env.VIDEO) {
    // add video recording settings
    const videoRecordingOptions = {
      video: true,
      videoUploadOnPasses: false,
      videoCompression: 50,
      videosFolder: 'cypress/videos',
    }
    // merge video recording options into config
    config = merge(config, videoRecordingOptions)
  }

  return config
}
module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://app.conceptboard.com/login-redirect',
    env: {
      username: 'damjan@wedoqa.co',
      password: 'valid11Password!',
      "NODE_OPTIONS": "--unhandled-rejections=strict"
    },
    
    chromeWebSecurity: false,
    chromeWebSecurityDisableFetch: true,
  },
});
