const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { NODE_ENV = "development" } = process.env;
const IS_DEVELOPMENT = NODE_ENV === "development";
function createTarget({ target }) {
    let name = IS_DEVELOPMENT ? "[name].js" : "[hash:16].js";

    let IS_SERVER = target === "server";
    let IS_CLIENT = target === "client";

    return {
        isDevelopment: IS_DEVELOPMENT,
        webpack: {
            // mode: "production",
            mode: "development",
            plugins: [
                new CleanWebpackPlugin(),
                new webpack.DefinePlugin({
                    IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
                    IS_SERVER: JSON.stringify(IS_SERVER),
                    IS_CLIENT: JSON.stringify(IS_CLIENT)
                }),
                new LoadablePlugin(),
                new CompressionPlugin()
            ],
            output: {},
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env", "@babel/preset-react"],
                                plugins: [
                                    "babel-plugin-styled-components",
                                    "@babel/plugin-transform-runtime",
                                    "@babel/plugin-proposal-class-properties",
                                    "@loadable/babel-plugin"
                                ]
                            }
                        }
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    publicPath: "/assets",
                                    outputPath: "assets"
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
}

module.exports = {
    createTarget
};