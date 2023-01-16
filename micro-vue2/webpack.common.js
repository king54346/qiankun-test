const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// const svgBuilder = require('./src/components/icon//svg/svg.js')
// const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = (isProduction) => {
    const cssFinalLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'// 生产环境用MiniCssExtractPlugin这个插件中的一个loader取代style-loader。作用：提取js中的css成单独文件，这样页面上也不是创建style标签的形式的，而是通过link标签来加载css，解决了白屏的效果
    return {
        context: path.resolve(__dirname, 'src'),
        entry: path.resolve(__dirname, './src/main.ts'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[contenthash:8].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json'],
            alias: {
                "@": path.resolve(__dirname, './src')
            },
        },
        module: {
            rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                }]
            }, {
                // 兼容性处理css
                test: /\.css$/,
                use: [cssFinalLoader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: { // 指定配置文件，如果不指定的话其实是默认去根路径找postcss.config.js这个文件的，指定的好处就是可以指定特定的文件名
                            config: path.resolve(__dirname, './postcss.config.js')
                        }
                    }
                }]
            }, {
                // test: /.(sa|sc|le|c)ss$/,
                test: /\.(sass|scss)$/,
                use: [cssFinalLoader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [['autoprefixer']]
                        }
                    }
                }, 'sass-loader']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.svg$/,
                oneOf: [
                        {
                            exclude: path.resolve(__dirname, 'src/svg/common'), // 排除common文件夹下的svg
                            use: [
                                {
                                    // 小于10kb的svg转成base64，大于10kb的svg转成文件发到static文件夹下
                                    loader:'url-loader',
                                    options: {
                                        limit: '10000',
                                        name: 'static/[name].[hash:8].[ext]',
                                    },
                                },
                                ]
                        },
                        {
                            include: path.resolve(__dirname, 'src/svg/common'),// 处理的svg放在此路径下
                            use: [{
                                loader: 'svg-sprite-loader',
                                options: {
                                    symbolId: 'icon-[name]'
                                },
                            },
                                {
                                    loader: 'svgo-loader',
                                }
                            ],
                        }
                    ]

            }, {
                test: /.(jpe?g|png|gif)$/i,
                type: 'asset',
                generator: {
                    // 输出文件位置以及文件名,[ext] 自带 "." 与 url-loader 配置不同
                    filename: 'images/[name][hash:8][ext]',
                },
                // parser: {
                //   dataUrlCondition: {
                //     maxSize: 10 * 1024, //超过10kb不转 base64
                //   },
                // },
            }, {
                test: /\.(ttf|woff2?|eot|otf)$/,
                type: 'asset',
                generator: {
                    filename: 'font/[name][hash:8][ext]',
                },
            }, {
                test: /.(mp4|ogg|mp3|wav)$/,
                type: 'asset',
                generator: {
                    filename: 'media/[name][hash:8][ext]',
                },
            }, {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: false, // 开启多线程打包
                            appendTsxSuffixTo: ['\\.vue$'],
                        },
                    },
                ]
            }]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({// 插件ForkTsCheckerWebpackPlugin用于新建进程执行类型检查，为此你需要关闭ts-loader自身的类型检查功能，即设置transpileOnly为true
                typescript: {
                    extensions: {
                        vue: {
                            enabled: true, // 如果为true，则启用Vue单个文件组件支持。
                            compiler: '@vue/compiler-sfc' // 默认值是vue-template-compiler，不适用于vue3，用于解析.vue文件的编译器的程序包名称
                        }
                    },
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: false
                    },
                    configFile: path.resolve(__dirname, './tsconfig.json')
                }
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                inject: 'body', // 制定script脚本注入的位置为body
            }),
            new VueLoaderPlugin(),
            // svgBuilder('./src/assets/icons/')
        ]
    }
}