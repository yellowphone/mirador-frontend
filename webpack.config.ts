import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = env
    ? Object.keys(env).reduce((prev: any, next: any) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
      }, {})
    : {};

  const isProd = process.env.NODE_ENV === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      index: './src/index.tsx',
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'mirador.bundle.js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|j?g|svg|gif)?$/,
          use: 'file-loader',
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      stats: 'errors-only',
      overlay: true,
      historyApiFallback: true,
    },
  };
};
