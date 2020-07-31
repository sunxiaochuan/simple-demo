//写一个简单的函数
function test() {
	alert(2);
	return 'me test';
};

//比如说现在的需求是：你要统计一下当前的所有的函数谁耗时最长，然后做相应的性能优化

// //普通的方法
// function test() {
// 	var start = new Date();
// 	alert(2);
// 	var end = new Date();
// 	console.log(end - start);
// };

//无侵入式的写法
// //给 Function 的 prototype 上绑定一个 before 方法，就是在你函数执行之前给你一个时间点
// //参数 fn 是函数执行时要给的回调
// Function.prototype.before = function(fn){
// 	var __self = this;//拿到 这个 this，将这个 this 保存起来以便后面出现了问题还能拿到这个 this 的缓存
// 	//要先让回调 fn 先执行，这样就是在 test 函数执行前先执行了
// 	fn();
// 	//下面 self 执行自己就可以了 再把参数也传过去  这里的 return 可以拿到 test 中 return 的 'me test' 的
// 	return __self.apply(this,arguments);
// };
//给 Function 的 prototype 上绑定一个 after 方法，就是在你函数执行之后再给你一个时间点
//参数 fn 是函数执行时要给的回调
// Function.prototype.after = function(fn){
// 	//after 和 before 的执行顺序刚好相反，要先执行本身 this 然后再执行回调 fn
// 	var __self = this;//跟 before一样要先把这个 this 存起来
// 	//先执行它自己
// 	__self.apply(this,arguments);
// 	//再执行回调 fn
// 	fn();
// };

// //写完上面的其实就可以先执行 before 了
// test.before(function(){
// 	//先执行一个较简单的
// 	alert(1);
// });

// //下面执行的是 after 可以先将 test.before() 注释查看 after 的执行效果 之后再解注释查看效果 之后会发现 test 默认执行了两遍的问题 
// test.after(function(){
// 	//先执行一个较简单的
// 	alert(3);
// });


//上面的代码执行之后会出现一个问题：默认函数 test 被执行 2 遍
//解决思路是 将 test 作为中转
//before： 回调和 before 一起送到 after 去
//after 这个时候就可以写在前面了  也需要将 after 和 test 一起送到 before 去

//下面是如何去实现上面的思路，先将上面的注释掉，只留下 test 函数

//我们是将所有的东西都绑到了 before 身上，before 和 after 都挂载到了 Function 的原型链上，所有说我们得要他进行这样链式的调用
//想要进行链式的调用首先修改 before
Function.prototype.before = function(fn) {
    var __self = this; //拿到 这个 this，将这个 this 保存起来以便后面出现了问题还能拿到这个 this 的缓存
    //在这里 return 一个 function 回去 这样的话当我执行完 before 之后 ，因为 before 和 after 是挂载到了原型链上 这样这个 return function 就可以执行 after 和  before 了  因为 after 和  before 是挂载到了最顶层的原型链上
    return function() {
    	// //这里面的 this 指向的是调用的函数
    	// // console.log(this);//这里在控制台输出的是 window，因为这整个 return function 作为一个闭包已经被 return 出去了 当下面的 before 执行完之后 这个闭包已经被暴露在最外层的环境里了，所以这个 this 指向了 window
     //    //因为上面的 this 已经指向了 window 了为了使 window 也能使用这个 fn 可以将 fn 也写成下面 __self 那样
     //    fn.apply(this,arguments);
     //    //下面 self 执行自己就可以了 再把参数也传过去
     //    __self.apply(this, arguments);

        // //但是我们这里是需要保住之前执行的 this 也就是 test 函数 自己，所以需要用到上面缓存的 __self
        //  // fn.apply(__self,arguments);
        //  //这个如果想要动态的来改变这个 this 值的话也可以将 __self 写成 this 这个默认指向的是 window 
        //  fn.apply(this,arguments)

        //在这里做一个判断如果执行出错的话直接 return 这样就不会往下再执行了
         if(fn.apply(this,arguments) == false){
         	return false;
         }
         // __self.apply(__self, arguments);

         //在 test 函数执行完之后会有一个值 这个值一定要 return  出来 这样才能在 after 中执行的时候接收的到
         return __self.apply(__self, arguments);
    }
};
// //下面执行一下 before 查看效果
// test.before(function(){
// 	alert(1);
// })();

//接下来是同样的改写 after 
//after 与 before 不一样 before 是先执行回调再执行本身，而 after 是先执行本身然后再执行回调
Function.prototype.after = function(fn){
	var __self = this;
	return function(){
		// __self.apply(__self,arguments);

		//获取 before  return 的 function 执行后的 return 值
		var result = __self.apply(__self,arguments);
		//容错
		if(result == false){
			return false;
		}

		//这个如果想要动态的来改变这个 this 值的话也可以将 __self 写成 this 这个默认指向的是 window 
		fn.apply(this,arguments);

		//最后将上面获取到的 返回值 result 给 return 出去
		return result;
	}
}

// //接下来就可以进行 链式 调用了 
// //这个整个链式调用的执行机制如下
// //挂载 self 指向的是 test  	执行 before 回调 (注意此时 before 的回调是没有直接的执行的只是将这个 function 传给了 下面调用的 after)	执行 self(这个是 after 的 self ，指向的实际上是 before 返回的 function)	after 自己执行回调
// test.before(function(){
// 	alert(1);
// 	//因为 after 是挂载到 Function 的原型链上的 而 before 执行最后返回的是一个 function 所以就可以直接调用 after 了
// }).after(function(){
// 	alert(3);
// })();


// // 接下来我们来动态的改变一下 after 和 before 的顺序，因为不是所有的人都会照着你写的这个顺序来的
// //这个会按照 3 2 1 的顺序来输出
// test.after(function(){
// 	alert(1);
// 	//因为 after 是挂载到 Function 的原型链上的 而 before 执行最后返回的是一个 function 所以就可以直接调用 after 了
// }).before(function(){
// 	alert(3);
// })();


// //实际上应该是不管怎么改都应该是按照 1 2 3 的顺序来执行的，因为我们在 before 和 after 中做了处理，所以在这里我们的回调函数也要做相应的改变
// //这个的执行机制：
// //挂载 self 指向的是 test  	执行 after 回调 (注意此时 after 的回调是没有直接的执行的只是将这个 function 传给了 下面调用的 before)		执行 self(这个是 before 的 self ，指向的实际上是 after 返回的 function)	before 自己执行回调(虽然说在 after 的回调里是先执行了 test 再执行了回调 ，但是在 before 中是先执行了自己的回调 然后才执行了 after 中的回调)
// test.after(function(){
// 	alert(3);
// 	//因为 after 是挂载到 Function 的原型链上的 而 before 执行最后返回的是一个 function 所以就可以直接调用 after 了
// }).before(function(){
// 	alert(1);
// })();


// 如果说你想要在执行的时候对一些 返回进行判断可以这样写
test.after(function(){
	alert(3);
	//因为 after 是挂载到 Function 的原型链上的 而 before 执行最后返回的是一个 function 所以就可以直接调用 after 了
}).before(function(){
	alert(1);
	//在这里出错的话就 return 然后可以在 before 回调的时候判断
	// return false;
})();

//还有一个问题是 test 函数本身是 return 了一个字符串的，但是在反复的调用的时候这个给丢掉了，我们可以在 after 方法中(因为 after 是最后执行的)，得到并 return 出来