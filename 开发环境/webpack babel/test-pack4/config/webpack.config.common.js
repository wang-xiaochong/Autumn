// 自定义webpack打包配置

// 引用模块，获取绝对路径
const path = require('path')

// 引用html-webpack-plugin插件，自动生成可访问文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引用mini-css-extract-plugin插件，将css样式抽离出来，源文件使用link引入 基于webpack5实现
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {


    // entry: './src/index.js',    // 打包入口文件

    // 入口分离代码打包 成较小的bundle.js 但相同包会重复打包 需要配合下面webpack内置的优化才能避免重复
    entry: {
        index: './src/index.js',
        index2: './src/index2.js'
    },


    output: {
        path: path.resolve(__dirname, '../dist'),    //新生成的打包文件位置 
        clean: true, //清理上一次打包生成的文件
        assetModuleFilename: 'images/[contenthash][ext]', //自定义所有打包后图片的输出位置
    },


    plugins: [
        // 实例化  并进行配置 与外部index关联 并控制script标签位置
        new HtmlWebpackPlugin({
            template: './index.html',  // 关联外部index.html
            filename: 'app.html',    // 定义打包后的html文件名
            inject: 'body',          //script标签加入到body中
        }),
        // 实例化css抽离插件 外部link引入样式
        new MiniCssExtractPlugin({
            filename: 'styles/[contenthash].css'

        })
    ],

    // 资源模块
    module: {
        // 规则 数组 配置很多的对象加载不同的文件
        rules: [
            // 加载四种资源类型
            {
                test: /\.jpg$/,         //定义加载的文件的类型
                type: 'asset/resource',   //资源类型
                generator: {
                    filename: 'images/[contenthash][ext]' //优先级高于上面的out
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline'
            },
            {
                test: /\.txt$/,
                type: 'asset/source'    //加载文档中的内容
            },
            {
                test: /\.png$/,
                type: 'asset', //根据大小自动选择是resource还是inline
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 * 1024 //默认大小为8kb 该设置为4Mb 超过后dist会生成文件
                    }
                }
            },

            // babel 解析 ES6=>ES5
            {
                test: /\.js$/,
                exclude: '/node_modules/', //全局的js不需要babel解析
                use: {
                    loader: 'babel-loader', // 应用babel对js解析
                    options: {
                        // presets: ['@babel/preset-env'], // babel预设  使用后出现了问题 暂时不使用 
                        plugins: ['@babel/plugin-transform-runtime'] //gerrun需要时自动导包  单独使用好像没有降低版本
                    }
                }
            },


            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[contenthash][ext]' //优先级高于上面的out
                }
            },


            // css-loader配置
            {
                test: /\.(css|less)$/,
                // loader是逆序解析的，后面解析的传到前面，最后webpack希望返回一个js
                // use: ['style-loader', 'css-loader', 'less-loader'] //先执行css-loader后执行style-loader

                // 抽离css文件
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']

            }

        ]

    },




    // 优化
    optimization: {
        

        // 代码分离 压缩成更小的bundle时，公共部分抽离出来
        splitChunks: {
            // chunks: 'all'
            // 缓存
            cacheGroups: {
                vendor: {
                    // node_modules目录前后可能会有斜线 该目录下的包都打包成vendors 其他自己引用的模块不变
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }

    }

}



