var webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index'],
  output: {
    filename: 'dist/react-schema-form.min.js',
    library: 'ReactSchemaForm',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
        { test: /\.js?$/, loader: "babel", exclude: /node_modules/ },
      //{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css?$/, exclude: /node_modules/, loader: 'style!css'},
    ]
  }
};
