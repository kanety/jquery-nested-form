var webpack = require("webpack");

module.exports = {
  entry: ["./src/jquery-nested-form.js"],

  output: {
    path: __dirname + "/dist",
    filename: "jquery-nested-form.js"
  },

  resolve: {
    modules: [
      __dirname + "/src",
      "node_modules"
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  watchOptions: {
    poll: 1000
  }
};

