const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = withPlugins(
  [
    withTypescript,
    withCSS,
  ],
  {
    webpack(config, options) {
      if (config.resolve && config.resolve.alias) {
        Object.assign(config.resolve.alias, { src: resolve('src') })
      }

      return config
    },
  },
)
