const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');


const resolvePath = src => path.join(__dirname, src);

module.exports = (env, argv) => {
  const { mode } = argv;

  const PATHS = {
    app: resolvePath('src'),
    build: resolvePath('dist'),
    entry: resolvePath('src/index.js'),
    nodeModules: resolvePath('node_modules'),
  };

  return {
    entry: {
      app: ['@babel/polyfill', PATHS.entry],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 500000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
          },
        },
      },
      minimizer: [
        new UglifyWebpackPlugin({
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
    },
    output: {
      publicPath: '/',
      path: PATHS.build,
      filename: mode === 'production' ? '[name].[hash].js' : '[name].js',
    },
    target: 'web',
    devtool: mode === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
    resolve: {
      modules: [PATHS.nodeModules, PATHS.app],
      extensions: ['.js', '.json', '.svg', '.jpg', '.png'],
    },
    devServer: {
      // open: true,
      stats: 'errors-only',
      historyApiFallback: true,
      // host: '',
      disableHostCheck: true,
      port: 5050,
      overlay: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        BABEL_ENV: mode,
      }),
      new HtmlWebpackPlugin({
        title: 'Sözcü Dashboard',
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
          { content: 'ie=edge', 'http-equiv': 'x-ua-compatible' },
        ],
        prefetch: ['**/*.*'],
        preload: ['**/*.*'],
        template: HtmlWebpackTemplate,
        appMountId: 'app',
        inject: false,
        minify: {
          removeComments: false,
          collapseWhitespace: false,
        },
      }),
      new ResourceHintWebpackPlugin(),
      new CleanWebpackPlugin([PATHS.build]),
      new WriteFilePlugin(),
      new ErrorOverlayPlugin(),
      new webpack.WatchIgnorePlugin([
        PATHS.nodeModules,
      ]),
      new CaseSensitivePathsPlugin(),
      new MiniCssExtractPlugin({
        filename: mode === 'production' ? '[name].[hash].css' : '[name].css',
        chunkFilename: mode === 'production' ? '[id].[hash].css' : '[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader?sourceMap',
            {
              loader: 'less-loader?sourceMap',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|svg)$/,
          use: 'file-loader',
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          include: PATHS.app,
          use: ['eslint-loader', 'stylelint-custom-processor-loader'],
        },
        {
          test: /\.js$/,
          include: PATHS.app,
          use: 'babel-loader',
        },
      ],
    },
  };
};
