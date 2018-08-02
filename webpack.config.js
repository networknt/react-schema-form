var webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index'],
  output: {
    filename: './dist/react-schema-form.min.js',
    library: 'ReactSchemaForm',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    }
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css?$/, exclude: /node_modules/, loader: 'style-loader!css-loader'},
    ]
  }
};
