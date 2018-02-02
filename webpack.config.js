const { resolve } = require('path')

const name = 'mobx-angularjs'

module.exports = ({ type }) => {
  const config = {
    context: resolve(__dirname, 'src'),
    entry: './index.ts',
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
      config.output.filename = `${name}.js`
      config.devtool = 'inline-source-map'
      break
    case 'umd.min':
      config.output.libraryTarget = 'umd'
      config.output.filename = `${name}.min.js`
      break
  }

  return config
}
