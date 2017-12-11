var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// console.log(webpack);//测试 webpack 是否安装成功   

//最核心的模块，所有的东西都要在这里面进行
module.exports = {
    //配置入口资源
    //它的值可以是数组也可以是单一的一个
    entry: __dirname + '/src/scripts/app.js',
    //配置编译后的资源
    //将编译后的资源放到哪去
    output: {
        path: __dirname + '/build',
        //hash 表示的是：平常的 index.js 编译后就变成了 index.assxx.js
        filename: 'scripts/[name]-[hash].js'
    },
    //配置插件
    plugins: [
        new HtmlWebpackPlugin({ // Also generate a test.html 
            filename: 'index.html',
            template: __dirname + '/src/index.html'
        })
    ],
    //资源处理
    module: {
        loaders: [{
            //后面是正则匹配所有已 css 结尾的文件
            test: /\.css$/,
            //这里要装两个 loader 两个loader 之前的 感叹号是联合起来
            loader: 'style-loader!css-loader'
        }]
    },
    //配置扩展名
    resolve: {
        extensions: ['.js', '.css']
    }
}