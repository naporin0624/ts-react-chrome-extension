/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("./webpack.config.common");
const ChromeExtensionReloader = require("webpack-chrome-extension-reloader");

module.exports = {
  ...config,
  mode: "development",
  watch: true,
  devtool: "source-map",
  module: {
    rules: [
      ...config.module.rules,
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    ...config.plugins,
    new ChromeExtensionReloader({
      reloadPage: true, // Force the reload of the page also
      entries: {
        // The entries used for the content/background scripts
        contentScript: "content",
        background: "background" // *REQUIRED
      }
    })
  ]
};
