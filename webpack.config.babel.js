import {resolve} from 'path';

module.exports = {

  entry: {
    app: './src/client/js/app.js'
  },

  output: {
    filename: '[name].dist.js',
    path: resolve(__dirname, 'dist/client')
  },

  module: {
    rules: [{ 
      test: /\.js$/, 
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  }

};
