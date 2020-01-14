const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base").createTarget({
    target: "client"
});
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    mode: "production",
    devtool: "source-map",

    entry: "./src/client/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },

    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false })]
    }
};

module.exports = merge(baseConfig.webpack, config);