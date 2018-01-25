const { resolve } = require('path')

const name = 'mobx-angularjs'

module.exports = ({ type }) => {
  const config = {
    context: resolve(__dirname, 'lib'),
    entry: './mobx-angularjs.ts',
    module: {
      rules: [
        { 
          test: /\.ts$/, 
          use: 'ts-loader', 
          exclude: /node_modules/
        }
      ]
    },
    output: {
      path: resolve(__dirname, 'dist'),
    },
    externals: {
      angular: 'angular',
      mobx: 'mobx'
    }
  }

  switch (type) {
    case 'umd':
      config.output.libraryTarget = 'umd'
      config.output.filename = `${name}.umd.js`
      break
    case 'global':
      config.output.libraryTarget = 'jsonp'
      config.output.filename = `${name}.js`
      config.devtool = 'inline-source-map'
      break
    case 'global.min':
      config.output.libraryTarget = 'jsonp'
      config.output.filename = `${name}.min.js`
      break
  }

  return config
}