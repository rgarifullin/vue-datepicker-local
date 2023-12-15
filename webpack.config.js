const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const banner =
  'vue-datetime-local.js v1.0.19\n' +
  '(c) 2017-' + new Date().getFullYear() + ' weifeiyue\n' +
  'Released under the MIT License.'
module.exports = {
  mode: 'development',
  entry: {
    app: './example/app.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        esModule: false,
        preserveWhitespace: false
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin()
  ],
  devtool: '#cheap-module-eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.mode = 'production'
  module.exports.devtool = false
  module.exports.entry = {
    'vue-datepicker-local': './src/index.js'
  }
  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.BannerPlugin(banner),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
