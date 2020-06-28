const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['./src/js/main.ts'],
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'main.js'
  // },
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  devtool: 'eval-source-map',
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*', '.js', '.ts'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 5000,
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
    open: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use:  ['style-loader', 'css-loader']
      }
    ]
  },
};
