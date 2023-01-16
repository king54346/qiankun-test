const baseConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = merge(baseConfig(true), {
    mode: 'production',
    output: {
        clean: true
    },
    devtool: 'hidden-source-map',// 错误代码错误原因，但是没有错误位置不能追踪源代码错误，只能提示到构建后代码的错误位置
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[hash:8].css',
        })
    ].filter(Boolean),
    // Some libraries import Node modules but don't use them in the browser.
    optimization: {
        // usedExports: true,
        // Automatically split vendor and commons

        // name chunk 的文件名
        // test 过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配到某个 chunk 的名字时，这个 chunk 里面引入的所有 module 都会选中；
        // priority 权重，数字越大表示优先级越高。一个 module 可能会满足多个 cacheGroups 的正则匹配，到底将哪个缓存组应用于这个 module，取决于优先级；
        // chunks（非常非常非常重要） 有三个值：all、async、initial。
        // asyn : (default)
        //
        // 会生成两个打包文件：
        //
        // bundle.js (包含 app.js + my-statis-module)
        // chunk.js (只包含 my-dynamic-module)


        // initial : 会生成三个打包文件：
        // app.js (只包含 app.js)
        // bundle.js (只包含 my-static-module)
        // chunk.js (只包含 my-dynamic-module)

        // all :
        //
        // 会生成两个打包文件：
        //
        // app.js (只包含 app.js)
        // bundle.js (包含 my-static-module + my-dynamic-module)

        splitChunks: {
        /*
        默认值可以不写
        minSize: 30 * 1024, // 分割的chunk最小为30kb
        maxSiza: 0, // 最大没有限制
        minChunks: 1, // 要提取的chunk最少被引用1次
        maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
        maxInitialRequests: 3, // 入口js文件最大并行请求数量
        automaticNameDelimiter: '~', // 名称连接符
        name: true, // 可以使用命名规则
        */
            chunks: 'all',
            // chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {
                components: {
                    name: 'chunk-components',
                    test: path.resolve(__dirname, './src/components'),
                    minChunks: 2,
                    priority: 5,
                    reuseExistingChunk: true,
                },
                corejs: {
                    minSize: 1,
                    test: /\/node_modules\/core-js\//,
                    name: 'vendor/core-js',
                },
                lodash: {
                    minSize: 1,
                    test: /\/packages\/utils\//,
                    name: 'vendor/utils',
                },
                spriteSvg: {
                    minSize: 1,
                    test: /[\\/]src[\\/]svg[\\/]common[\\/]/,
                    name: 'svg-common',
                },
                // 提取vue全家桶
                vue: {
                    minChunks: 1,
                    test: /\/node_modules\/vue(-router)?\//,
                    name: 'vendor/vue-family',
                },
                // 分割chunk的组
                // node_modules文件会被打包到 libs 组的chunk中。--> chunk-vendors~xxx.js
                // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
                vendors: {// 分离入口文件引用node_modules的第三方包
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial',
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true,//reuseExistingChunk 表示是否使用已有的 chunk，true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的，即几个 chunk 复用被拆分出去的一个 module；
                },
            },
        },
        // https://github.com/facebook/create-react-app/issues/5358
        // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime....js,解决了如改动a文件导致b文件的contenthash变化。runtimeChunk作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低。
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
    },
})