var path = require("path");
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./components/entry.jsx",
  mode: "development",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      { test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
     { test: /\.css$/,
       use: [
         { loader: "style-loader" },
         { loader: "css-loader" }
       ]
     },
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: "babel-loader"
     }, {
       test: /\.jsx?$/,
       exclude: /node_modules/,
       use: "babel-loader"
     }, {
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    }
   ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
