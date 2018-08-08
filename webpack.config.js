var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: path.resolve(__dirname, "src/main.ts"),
    watch: true,
    output: {
        path: path.resolve(__dirname, "es5"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        allowTsInNodeModules: true
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new extractTextPlugin("style.css")
    ]
};
