// Webpack: Bundles JavaScript files into a chosen number of files for web browser usage

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js", // "Where are the JavaScript files to be bundled?"; relative path 
  output: {
    // 'path.resolve()': Uses sequences of paths to form absolute path; '_dirname' = 'frontend' directory
    path: path.resolve(__dirname, "./static/frontend"), // Chooses LOCATION for bundled file in project
    filename: "[name].js", // Sets NAME of bundled file 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // DON'T bundle the 'node_modules' folder
        use: {
          loader: "babel-loader", // Use Babel whilst bundling
        },
      },
    ],
  },
  optimization: {
    minimize: true, // Makes JavaScript code "smaller" (e.g., removing white space, unneeded info)
  },
  plugins: [
    /* 'webpack.DefinePlugin()': Replaces tokens in compiled code with other tokens
        Tokens: Basic components of source code (e.g., keywords, identifiers, constants, ...) 
        Source Code: Fundamental components of computer programs (generally written in plain text) 
        https://www.geeksforgeeks.org/difference-between-source-code-and-object-code/ */
    new webpack.DefinePlugin({ // 
      "process.env": {
        // This has effect on the react lib size; JSON.stringify()': JavaScript Object -> JSON String
        NODE_ENV: JSON.stringify("development"), // *Note: Change to "production" when running production 
      },
    }),
  ],
};

/* Replace 'test' script with 2 new scripts to 'package.json': 
(1) '"dev": "webpack --mode development --watch"'': Runs Webpack in "development" and "watch" mode
  - "Development": Doesn't minimize code as aggressively and produces better source maps for debugging
  - "Watch": Inspects changes made to JavaScript files and auto-re-bundles them after refreshing browser 
(2) '"build": "webpack --mode production"'': Runs Webpack in "production build" mode 
  - "Production": Makes smallest bundle possible (i.e., lots of minimizing and smaller source maps) */

// Source Map: Files that create mappings between original source code and minimized code 
// Minimized code drastically improves websites' LOAD TIMES and BANDWIDTH USAGES ! 