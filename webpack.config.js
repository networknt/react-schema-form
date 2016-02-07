module.exports = {
  entry: './src/index',
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
  module: {
    loaders: [
        { test: /\.js?$/, loaders: ['react-hot-loader', "babel-loader"], exclude: /node_modules/ },
      //{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css?$/, exclude: /node_modules/, loader: 'style!css'},
    ]
  }
};
