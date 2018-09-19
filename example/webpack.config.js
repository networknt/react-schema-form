const {resolve} = require('path')

module.exports = {
  context: __dirname,
  devServer: {
    contentBase: __dirname
  },
  devtool: 'cheap-source-map',
  entry: {
    form: './main'
  },
  output: {
    filename: '[name].entry.js'
  },
  resolve: {
    alias: {
      // Use uncompiled version
      'react-schema-form': '../src',
      'react': resolve('./node_modules/react'),
      'react-dom': resolve('./node_modules/react-dom')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
    ]
  }
}
