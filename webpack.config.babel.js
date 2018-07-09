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
    test: /\.js$/, 
    use: 'babel-loader',
    exclude: '/node_modules'
  }]
};

config.mode = 'development';
config.watch = true;

module.exports = config;
