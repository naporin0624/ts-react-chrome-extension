const path = require("path");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin");
module.exports = {
  entry: {
    main: ["./src/App.tsx", "babel-polyfill"],
    background: "./src/background.ts",
    content: "./src/contentScript.ts"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: [
          {
            loader: "json-loader"
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: ({ chunk: { name } }) =>
      name === "main" ? "js/[name]-[hash].js" : `${name}.js`,
    path: path.join(__dirname, "dist"),
    publicPath: "/"
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      excludeAssets: [/background|content.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin(),
    new CopyPlugin([
      {
        from: path.join(__dirname, "./public/manifest.json"),
        to: path.join(__dirname, "dist", "./manifest.json")
      },
      {
        from: path.join(__dirname, "public/index.html"),
        to: path.join(__dirname, "dist/index.html")
      }
    ])
  ]
};
