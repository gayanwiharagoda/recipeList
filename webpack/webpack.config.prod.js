const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: resolve(__dirname, "../src")
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  optimization: {
    minimize: true,
    splitChunks: {
      minChunks: 2
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, "../src")],
        use: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loaders: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./images/",
              publicPath: ""
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "application for unibet",
      template: "src/index.html"
    })
  ]
};
