const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

// 项目的主要配置文件
module.exports = {
    // 二级路径
    // publicPath: 'dm',
    // 用于设置是否为生产环境构建生成source map，一般在生产环境下为了快速定位错误信息
    productionSourceMap: true,
    // 链式配置webpack
    chainWebpack: config => {
        // 文件路径别名
        config.resolve.alias
            .set('@utils', resolve('./src/utils'))
            .set('@config', resolve('./src/config'))
            .set('@pages', resolve('./src/pages'))
            .set('@router', resolve('./src/router'))
            .set('@com', resolve('./src/components'))
            .set('@img', resolve('./src/img'))
            .set('@store', resolve('./src/store'))
            .set('@service', resolve('./src/service'));
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: []
        }
    },
    devServer: {
        open: true, // 是否自动打开浏览器页面
        host: '0.0.0.0', // 指定使用一个host，默认是localhost
        port: 8080, // 端口号
        https: false, // 是否使用https提供服务
        proxy: null // string | Object 代理设置
    }
}
