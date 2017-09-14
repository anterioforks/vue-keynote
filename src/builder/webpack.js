const config = module.exports = exports = {}

config.entry = {}
config.output = {}

config.module = {}
config.module.rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: [/node_modules/]
  },
  {
    test: /\.es6$/,
    loader: 'babel-loader'
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      postcss: postcssOptions,
      loaders: loaders.cssLoaders(cssOptions)
    }
  },
  {
    test: /\.(ico|jpg|png|gif|svg|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file-loader',
    query: {
      name: filenames.static
    }
  }
]
