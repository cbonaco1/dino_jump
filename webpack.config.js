module.exports = {
  context: __dirname,
  entry: "./dinoGame.js",
  output: {
    path: "./javascript",
    filename: "bundle.js"
  },

  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", '.jsx']
  }

};
