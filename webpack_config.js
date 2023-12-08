const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  devtool: "source-map", // Updated value
  entry: [path.resolve(__dirname, "src")],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "appfairy.js",
    library: "appfairy",
    libraryTarget: "commonjs2",
  },
  mode: "none",
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: ["babel-loader"],
      },
      // Removed json-loader rule
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      entryOnly: false,
      raw: true,
    }),
  ],
  externals: [nodeExternals()],
  externalsPresets: { node: true },
  node: {
    __dirname: false,
    __filename: true,
  },
};
