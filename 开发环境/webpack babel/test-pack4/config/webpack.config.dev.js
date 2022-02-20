// 自定义webpack打包配置

module.exports = {
    output: {
        // filename: 'bundle.js',  // 新生成的文件名称
        // filename: 'bundles/[name].bundle.js', // 多入口文件对应的多个输出文件
        filename: 'bundles/[name].js', //浏览器缓存 修改内容后更新打包后文件名
       
    },

    mode: 'development', //开发环境

    devtool: 'inline-source-map', // 快速找到代码出现错误的位置

    // 热启动
    devServer: {
        static: './dist'
    },

}



