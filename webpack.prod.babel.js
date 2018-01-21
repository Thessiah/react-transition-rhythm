import Webpack from 'webpack';
import Path from 'path';
import Minify from 'babel-minify-webpack-plugin'

const config = {
  context: Path.join(__dirname, './src'),
  entry: './index.js',
  output: { 
    path: Path.join(__dirname, './dist'), 
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new Minify()
  ]
}

export default config