var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    mode: "development",
    devtool: "source-map",
    context: path.resolve(__dirname, ""),
    entry: [
        path.resolve(__dirname, "src/vendor.ts"),
        path.resolve(__dirname, "src/main.ts")
    ],
    target: "web",
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
    devServer: {
        contentBase: [
            path.resolve(__dirname, ''),
            path.resolve(__dirname, 'src'),
        ],
        open: true,
        compress: true,
        port: 4200
    },
    plugins: [
        new extractTextPlugin("style.css")
    ]
};
