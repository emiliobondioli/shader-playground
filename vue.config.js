// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('shader')
      .test(/\.frag|.vert$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end()
  }
}