var s = function(data) {
	//console.warn 向web 控制台输出一条警告信息
	console.warn(data);
}
//切记这里要按照模块的规范一样将要导出的东西导出，这里我们将函数 s 导出去了
module.exports.fn = s;