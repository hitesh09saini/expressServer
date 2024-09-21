const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js', // Entry point of your Express app
  target: 'node',          // Ensures Webpack knows you're building for Node.js
  externals: [nodeExternals()], // Prevent bundling of node_modules
  mode: 'production',      // Set mode to production (or 'development' as needed)
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js'                  // Bundle file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Ensures compatibility with newer JS features
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
