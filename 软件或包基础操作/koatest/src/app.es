import Koa from 'koa';
import router from 'koa-simple-router';
import initController from './controller/initController';
import render from 'koa-swig';
import co from 'co';
import babel_co from 'babel-core/register';
import babel_po from 'babel-polyfill';
import CONFIG from './config/config';
import serve from 'koa-static';

const app = new Koa();
initController.init(app,router);
 app.context.render = co.wrap(render({
  root: CONFIG.get('viewDir'),
  autoescape: true,
  cache: 'memory', // disable, set to false 
  ext: 'html', 
  writeBody: false
}));
app.use(serve(CONFIG.get('staticDir')));
app.listen(CONFIG.get('port'));
export default app;