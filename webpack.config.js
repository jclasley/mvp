const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body',
});
// const webpack = require('webpack');

module.exports = {
  mode: `${process.env.MODE}`,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
          /coverage/,
          /tests/,
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }, 
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    HTMLWebpackPluginConfig,
    new Dotenv()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // devtool: 'source-map'
}
