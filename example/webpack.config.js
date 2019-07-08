const path = require("path");

module.exports = {
    context: __dirname,
    devServer: {
        contentBase: __dirname
    },
    devtool: "cheap-source-map",
    entry: {
        form: "./main"
    },
    output: {
        filename: "[name].entry.js"
    },
    resolve: {
        alias: {
            // Use uncompiled version
            "react-schema-form": "../src",
            // Use compiled version
            // 'react-schema-form': '../dist/react-schema-form.min.js',
            react: path.resolve("./node_modules/react"),
            "react-dom": path.resolve("./node_modules/react-dom")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: [
                                "@babel/preset-react",
                                "@babel/preset-flow"
                            ],
                            plugins: ["@babel/plugin-proposal-class-properties"]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100000
                        }
                    }
                ]
            }
        ]
    }
};
