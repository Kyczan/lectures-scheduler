import { resolve } from 'path';
import webpack from 'webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

module.exports = {
  entry: {
    app: './src/client/index.js'
  },

  output: {
    filename: '[name].dist.js',
    path: resolve(__dirname, 'dist/client')
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pl/)
  ],
  mode: 'production'
};
