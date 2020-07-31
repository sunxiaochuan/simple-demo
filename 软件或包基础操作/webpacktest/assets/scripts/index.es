require('../styles/index.less');
//加载 async.es 文件导出的函数 res 并执行该函数
import('./async.es').then(function(res) {
	res.default();
});
import {data} from './data.es';
// const data = 123;
console.log(data);
// if(false == false){
// 	console.log(1);
// }
// if(false != false){
// 	console.log(1);
// }