var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['react-hot', 'babel'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Functional Programming',
      template: 'src/index.ejs',
      inject: 'body'
    })
  ]
};
