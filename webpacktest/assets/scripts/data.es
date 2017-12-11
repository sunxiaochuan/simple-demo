//es6  Map   参考链接：http://es6.ruanyifeng.com/#docs/set-map#Map
const m =  new Map();
m.set('data','Index init');
//导出一个函数
export const test = function() {
	console.log('test treeShaking');
}
//导出一个属性值
export const data = m.get('data');