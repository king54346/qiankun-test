const baseConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge')
const {name} = require('./package');
module.exports = merge(baseConfig(false), {
    target: 'web',
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',// 错误代码错误原因，但是没有错误位置不能追踪源代码错误，只能提示到构建后代码的错误位置
    devServer: {
        port: 8089,
        compress: true,
        open: true,
        historyApiFallback: true, // history路径在刷新出错时重定向开启
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    output: {
        library :`${name}-[name]`,
        libraryTarget: 'umd',
        globalObject : 'window'
    }

})