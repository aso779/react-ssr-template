const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base").createTarget({
    target: "client"
});
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const config = {
    plugins: [
        // new BundleAnalyzerPlugin({
        //   analyzerPort: 9911
        // })
    ],

    target: "web",

    entry: "./src/client/index.js",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    }
};

module.exports = merge(baseConfig.webpack, config);