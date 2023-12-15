const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const banner =
  'vue-datetime-local.js v1.0.19\n' +
  '(c) 2017-' + new Date().getFullYear() + ' weifeiyue\n' +
  'Released under the MIT License.'
module.exports = {
  mode: 'development',
  entry: {
    app: './example/app.js'
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
      use: [process.env.NODE_ENV !== 'production'
        ? 'vue-style-loader'
        : MiniCssExtractPlugin.loader, 'css-loader']
    }]
  },
  devServer: {
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin()
  ],
  devtool: 'eval-cheap-module-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.mode = 'production'
  module.exports.devtool = false
  module.exports.entry = {
    'vue-datepicker-local': './src/index.js'
  }
  module.exports.output = {
    libraryTarget: 'umd',
    library: '[name]'
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.BannerPlugin(banner),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
  module.exports.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  }
}
