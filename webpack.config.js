var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var isProd = (process.env.NODE_ENV === 'production');

// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
  var plugins = [];

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV
    }
  }));

  // Use html plugin
  plugins.push(new HtmlWebpackPlugin({
    title: '田字格',
    template: 'index.html',
    inject: 'body'
  }));


  // Conditionally add plugins for Production builds.
  if (isProd) {
    //plugins.push(new webpack.optimize.UglifyJsPlugin());
  }
  // Conditionally add plugins for Development
  else {

  }

  return plugins;
}

module.exports = {
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: getPlugins(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }

    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    "createjs": "createjs"
  },
  devServer: {
    port: 4040,
    historyApiFallback: true
  }
}
