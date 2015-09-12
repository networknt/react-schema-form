module.exports = {
  context: __dirname,
  devServer: {
    contentBase: __dirname
  },
  entry: {
    form: './form/main'
  },
  output: {
    filename: '[name].entry.js'
  },
  resolve: {
    alias: {
      // Use uncompiled version
      'react-schema-form': '../../src'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
