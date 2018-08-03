var webpack = require('webpack');
var path = require('path');
//var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  context: __dirname,
  devServer: {
    contentBase: __dirname
  },
  entry: {
    form: './main'
  },
  output: {
    filename: '[name].entry.js'
  },
  resolve: {
    alias: {
      // Use uncompiled version
      // 'react-schema-form': '../src',
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  module: {
      loaders: [

          // I highly recommend using the babel-loader as it gives you
          // ES6/7 syntax and JSX transpiling out of the box
          {
              test: /\.(js|jsx)$/,
              loaders: ['babel-loader'],
              exclude: /node_modules/
          },
          {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
          {test: /\.css?$/, loader: 'style-loader!css-loader'},
          {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
      ]
  }
};
