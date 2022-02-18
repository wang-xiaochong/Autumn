// 自定义webpack打包配置

// 引用模块，获取绝对路径
const path = require('path')

// 引用html-webpack-plugin插件，自动生成可访问文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',    // 打包入口文件
    output: {
        filename: 'bundle.js',  // 新生成的文件名称
        path: path.resolve(__dirname, './dist'),    //新生成的打包文件位置 
        clean: true //清理上一次打包生成的文件
    },
    mode: 'development', //开发环境

    devtool: 'inline-source-map', // 快速找到代码出现错误的位置

    plugins: [
        // 实例化  并进行配置 与外部index关联 并控制script标签位置
        new HtmlWebpackPlugin({
            template: './index.html',  // 关联外部index.html
            filename: 'app.html',    // 定义打包后的html文件名
            inject: 'body',          //script标签加入到body中
        })
    ],


    devServer: {
        static: './dist'
    }
}



