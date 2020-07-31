//安装一个路径方法的包，这样就不用那么麻烦的写路径了
const path = require('path');
//引入可以将 less 解析为 css 的包
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引入webpack
const webpack = require('webpack');
//引入可以自动配置 html 文件的包
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Webpack2 与 1 还是一样的用这个配置 五个模块
module.exports = {
    //配置资源入口
    entry: {
        //这里的值如果是多个的话写成数组就可以 了
        'index': './assets/scripts/index.es'
    },
    //配置输出到的位置
    output: {
        //后面的值表示：指定编译之后的文件到哪里去
        path: path.join(__dirname, './assets/'),
        //这个是资源生成之后在每个文件前面加 ./  实际上线后要将这个路劲改为线上路径 如 https://xxx.com/
        publicPath: 'https://xxxx.com',
        //这个实际上是将文件名称生成 index.bundle.js 这样的
        filename: 'scripts/[name].bundle.js'
    },
    //配置 loader 用来处理文件
    module: {
        //这个相当于是将 webpack 1 中的 loaders 写到了这个 rules 里
        rules: [{
            //要处理的文件 后面是正则匹配的 以.es 结尾的文件
            test: /\.es$/,
            //这个是指明用哪些 loader 去处理上面选中的文件
            use: [{
                loader: 'babel-loader',
                //配置 babel-loader
                options: {
                    'presets': [
                        ['es2015', {
                            'modules': false
                        }], 'stage-0'
                    ]
                }
            }]
        }, {
            test: /\.less$/i,
            use: ExtractTextPlugin.extract({
                //fallback 的作用是所有的loader 都引用失败了 最后用我这个后面的loader
                fallback: 'style-loader',
                //正常情况下用的 loader
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            })
        }]
    },
    // externals:{
    //     jquery:'window.$'
    // },
    plugins: [
        new ExtractTextPlugin('styles/[name].css'),
        //生成一个公用的 如果有两个以上的文件同样的引用一样的js 代码 它就会生成一个 common.js 文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'scripts/[name].js',
            //引用了两次以上
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            //生成的新文件的名称  路径的话 以上面配置的 output    path: path.join(__dirname, './assets/')  为基准
            filename: 'index.html',
            //生成的新 html 文件 用到的 html 文件
            template: './index.html',
            inject: true
        }),
        //这个是 webpack 自带的模块 不需要装
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}