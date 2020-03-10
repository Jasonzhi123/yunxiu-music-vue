const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'))
      .set('utils', resolve('src/utils'))
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/common/styles/variable.scss";`
      }
    }
  },
  devServer: {
    disableHostCheck: true // 禁用webpack热重载检查 解决热更新失效问题
  }
}
