const path = require('path')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
    })],
    splitChunks: {
      cacheGroups: {
          chunks: 'all'
      }
    }
  },
  module: {
    rules: [     
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: './src/', from: '**/data/*.*' },
        { context: './src/', from: '**/images/icons/*.*' },
        { context: './src/', from: '**/vendors/mdl/*.min.js' },
        { context: './src/', from: '**/vendors/mdl/*.min.css' },
        { context: './src/', from: '**/favicon.ico' },
        { context: './src/', from: '**/manifest.json' },
        { context: './src/', from: '**/*.html' },
        { context: './src/', from: '**/service-worker.js' },
        { context: './src/', from: '**/robots.txt' },
        { context: './src/', from: '**/sitemap.xml' },
        { context: './src/', from: '**/css/app.css' }
      ]
    }),
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin()
  ]
}
