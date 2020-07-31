const Koa = require('koa');
const app = new Koa();
const router = require('koa-simple-router');//路由
const convert = require('koa-convert');//转换器
const serve = require('koa-static');
const path = require('path');
const render = require('koa-swig');
const co = require('co');
// response
// app.use(ctx => {
// 	ctx.body = 'Hello Koa';
// });
app.context.render = co.wrap(render({
	root: path.join(__dirname, './views'),
	autoescape: true,
  cache: 'memory', // disable, set to false 
  ext: 'html',
  writeBody: false
}));
app.use(router(_ => {
	_.get('/', (ctx, next) => {
		ctx.body = 'hello'
	})
	// app.use(async ctx => ctx.body = await ctx.render('index'));
	_.get('/index',async(ctx, next) => {
		ctx.body = await ctx.render('index.html');
	})
}));
app.use(convert(serve(path.join(__dirname ,'public'))));

app.listen(3000,() => {
	console.log('Server is started');
});