// 此文件担当webpack三个文件的合并 开发 线上 公共 ; 并且接收

// 获取merge对象
const { merge } = require('webpack-merge')

// 获取三个文件的配置
const commonConfig = require('./webpack.config.common')
const productionConfig = require('./webpack.config.prod')
const developmentConfig = require('./webpack.config.dev')

module.exports = (env) => {
    switch (true) {
        case env.development:
            return merge(commonConfig, developmentConfig)
        case env.production:
            return merge(commonConfig, productionConfig)
        
        default:
            return new Error('No matching configuration was found')
    }
}