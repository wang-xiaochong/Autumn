const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.js'),
    
    output: {
        filename: 'bundle.js',
        path:path.join(__dirname,'dist')
    },

    module: {
        rules: [
            {
                test: /\.svg$/,
                type: 'asset/inline'
            },
            // js 降低版本
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
            
            // babel 解析 ES6=>ES5
            // {
            //     test: /\.js$/,
            //     exclude: '/node_modules/', //全局的js不需要babel解析
            //     use: {
            //         loader: 'babel-loader', // 应用babel对js解析
            //         options: {
            //             presets: ['@babel/preset-env'], // babel预设  使用后出现了问题 暂时不使用 
            //             // plugins: ['@babel/plugin-transform-runtime'] //gerrun需要时自动导包  单独使用好像没有降低版本
            //         }
            //     }
            // },
        ]
        
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename:'app.html'
        })
    ],

    devServer: {
        port: 3000,
    }
    



}