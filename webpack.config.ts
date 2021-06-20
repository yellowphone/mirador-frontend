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
      alias: {
        process: 'process/browser',
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
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
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
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
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.config().parsed), // it will automatically pick up key values from .env file
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.EnvironmentPlugin(['REACT_APP_BACKEND_API_URL']),
      new webpack.EnvironmentPlugin(['REACT_APP_GOOGLE_CLIENT_ID']),
      new webpack.EnvironmentPlugin(['REACT_APP_MAPS_API_KEY']),
      new webpack.EnvironmentPlugin(['REACT_APP_MONGODB_API_URL']),
      new webpack.EnvironmentPlugin(['REACT_APP_SC_ATTR']),
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
