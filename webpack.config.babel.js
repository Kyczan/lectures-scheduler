import {resolve} from 'path';

const config = {};

config.entry = {
  app: './src/client/js/app.js'
};

config.output = {
  filename: '[name].dist.js',
  path: resolve(__dirname, 'dist/client')
};

config.module = {
  rules: [{
    use: [{
      loader: 'babel-loader'
    }]
  }]
};

config.mode = 'development';

module.exports = config;
