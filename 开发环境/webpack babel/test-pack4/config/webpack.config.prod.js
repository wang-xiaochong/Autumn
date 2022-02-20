// 自定义webpack打包配置
// 引用css-minimizer-webpack-plugin插件，来将抽离出来的css样式进行压缩
const CssMiniMizerPlugin = require('css-minimizer-webpack-plugin')

// 压缩代码插件 因为单独压缩了css 所以需要该插件进行压缩打包后的代码
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    output: {
        // filename: 'bundle.js',  // 新生成的文件名称
        // filename: 'bundles/[name].bundle.js', // 多入口文件对应的多个输出文件
        filename: 'bundles/[name].[contenthash].js', //浏览器缓存 修改内容后更新打包后文件名
        publicPath: 'http://localhost:8080/'
    },

    mode: 'production', //线上环境

    // 优化
    optimization: {
        minimizer: [
            // 实例化css压缩插件  并且需要将mode由development改为production
            new CssMiniMizerPlugin(),
            // 生产环境下 压缩JS代码 开发环境下不进行压缩
            new TerserPlugin()
        ],
    },
    // 关闭了性能提示 文件太大会提示
    performance: {
        hints:false
    }

}



