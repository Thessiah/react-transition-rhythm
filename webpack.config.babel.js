import Webpack from 'webpack';
import Path from 'path';

const config = {
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

const indexConfig = {
  ...config,
  context: Path.join(__dirname, './src'),
  entry: './index.js',
  output: { 
    path: Path.join(__dirname, './dist'), 
    filename: 'index.js',
  }
}

const demoConfig = {
  ...config,
  context: Path.join(__dirname, './demo/src'),
  entry: './Demo.jsx',
  output: { 
    path: Path.join(__dirname, './demo/public'), 
    filename: 'demo.js',
  }
}
 
export default [
  indexConfig, 
  demoConfig
];