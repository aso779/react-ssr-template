const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base").createTarget({
    target: "server"
});
const webpackNodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    mode: "production",
    devtool: "source-map",

    target: "node",

    entry: "./src/server/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },

    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false })]
    },

    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig.webpack, config);
