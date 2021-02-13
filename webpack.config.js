const path = require('path');
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
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
