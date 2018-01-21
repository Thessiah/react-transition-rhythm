import Webpack from 'webpack';
import Path from 'path';

const config = {
  devtool: 'eval',
  context: Path.join(__dirname, './demo/src'),
  entry: './Demo.jsx',
  output: { 
    path: Path.join(__dirname, './demo/public'), 
    filename: 'demo.js',
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
  }
}

export default config;