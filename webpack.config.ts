import { resolve } from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isProd = process.env.NODE_ENV === "production";

module.exports = {
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
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    stats: 'errors-only',
    overlay: true,
  }
};

// if (isProd) {
//   config.optimization = {
//     minimizer: [new TerserWebpackPlugin()],
//   };
// } else {
//   config.devServer = {
//     port: 3000,
//     open: true,
//     hot: true,
//     compress: true,
//     stats: "errors-only",
//     overlay: true,
//   };
// }

// module.exports = config;

// module.exports = {
//   entry: {
//     app: './src/index.tsx',
//     // print: './src/print.js',
//   },
//   devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.jsx']
//   },
//   plugins: [
//     // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//      title: 'Mirador',
//     }),
//    new WorkboxPlugin.GenerateSW({
//      // these options encourage the ServiceWorkers to get in there fast
//      // and not allow any straggling "old" SWs to hang around
//      clientsClaim: true,
//      skipWaiting: true,
//    }),
//   ],
//   output: {
//     filename: 'mirador.bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };