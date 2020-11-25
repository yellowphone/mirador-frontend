import { resolve } from 'path';
import webpack from 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
  
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev: any, next: any) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  const isProd = process.env.NODE_ENV === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      path: resolve(__dirname, "dist"),
      filename: "mirador.bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
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
          use: 'file-loader'
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        inject: "body",
      }),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      stats: 'errors-only',
      overlay: true,
    }
  }
};
