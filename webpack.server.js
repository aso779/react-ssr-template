const path = require("path");
const merge = require("webpack-merge");
const webpackNodeExternals = require("webpack-node-externals");
const baseConfig = require("./webpack.base").createTarget({
    target: "server"
});

const config = {
    watch: true,

    target: "node",

    entry: "./src/server/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },

    externals: [webpackNodeExternals()]
};
module.exports = merge(baseConfig.webpack, config);