const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

// 项目的主要配置文件
module.exports = {
    // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
    chainWebpack: (config)=>{
        // 修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('@utils', resolve('./src/utils'))
            .set('@config', resolve('./src/config'))
            .set('@pages', resolve('./src/pages'))
            .set('@router', resolve('./src/router'))
            .set('@com', resolve('./src/components'))
            .set('@img', resolve('./src/img'))
            .set('@axios', resolve('./src/axios'))
            .set('@store', resolve('./src/store'))
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: []
      }
    }
}
