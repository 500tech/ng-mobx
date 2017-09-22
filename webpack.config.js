module.exports = {
    context: __dirname + '/lib',
    entry: './ng-mobx',
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['babel-plugin-add-module-exports']
        },
      }]
    },
    output: {
      // export itself to a global var
      libraryTarget: 'umd',
      // name of the global var: 'Foo'
      library: 'ng-mobx',
      umdNamedDefine: true,
      path: __dirname + '/dist',
      filename: 'ng-mobx.js'
    },
	externals: {
      angular: 'angular',
      mobx: 'mobx'
    }
};
