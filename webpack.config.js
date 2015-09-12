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
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};
