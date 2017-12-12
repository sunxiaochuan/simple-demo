//写出下面的正确输出
for (var i = 0; i < 3; i++) {
	setTimeout(function(){
		console.log(i);
	},(function(){
		var b = i * 1000;
		console.log(b);
		return b;
	})());
}
//结果为
// 0
// 1000
// 2000

// 3
// 3
// 3

//解析：上面的方法因为 setTimeout 的第一个 function 是异步执行机制 他会等到 for 循环完之后才执行  相当于是将循环出的三个 function 排成了队列，因为 for 循环到后 i 变成了 3，所以最后轮到这三个任务的时候输出的都是 3 
//而   setTimeout 的第二个 function 是自执行函数，这个是同步执行机制，for 的每次循环他都跟着执行了