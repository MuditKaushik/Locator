var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "es6/main.js"),
    output: {
        path: path.resolve(__dirname, "es5"),
        filename: "bundle.js"
    },
    devtool: "source-map",
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
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
    plugins: [new extractTextPlugin("style.css")]
};