//引入 开发版本使用的 js 配置文件
const DevWebpack = require('./config/webpack.dev');
//引入 上线版本使用的 js 配置文件
const ProdWebpack = require('./config/webpack.prod');
//在这里做判断是用 开发版的还是上线版的  
//这里做判断的话需要引用 [better-npm-run](https://www.npmjs.com/package/better-npm-run) 模块
//[process](http://nodejs.cn/api/process.html#process_process)
switch( process.env.NODE_ENV ){
	//如果是开发版本
	case 'dev':
	module.exports = DevWebpack;
	break;
	//如果是上线版本
	case 'prod':
	module.exports = ProdWebpack;
	break;
	//默认是开发版本
	default:
	module.exports = DevWebpack;
	break;
}