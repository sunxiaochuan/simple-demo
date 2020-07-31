var container = document.getElementById('container');
var box = document.getElementById('box');
var arr = box.getElementsByTagName('div');
var radius = calculateRadius(129,arr.length);//计算出的元素需要向外扩的数值 404
for (var i = 0; i < arr.length; i++) {
    arr[i].style.background = 'url("./images/p'+(i+1)+'.png") no-repeat';
    arr[i].style.WebkitTransform = 'rotateY('+ 360 / arr.length * i+'deg) translateZ('+ radius +'px)';
}
//计算元素往外扩的距离也就是 解析中的 r 的长度
//length ：元素的宽度，totalNum ：元素的数量
function calculateRadius(length,totalNum){
	// 用元素宽度的一半 除以 tan (360度 / 20 ) 因为在程序中没有 度数的概念都是以弧度来进行计算的 用 Math.PI 当作是 180度	 
	// 参考网址：https://segmentfault.com/q/1010000007603046		π,不仅仅代表圆周率：3.1415926...；他还表示了弧度，初中应该学过的，π = 180°。
	// js中经常用的Math.PI来计算角度、弧度。因为Math.PI = 3.14 = 180°,所以想要旋转九十度的时候，就可以这样写Math.PI/2
	//2 * Math.PI / totalNum / 2  先是用 360度 也就是 2π 除以元素的总数量得到每个元素的度数， 这个是算出了单个元素的整个的度数，但是我们这里用到的是其一般的弧度所以除以 2
	return Math.round(length / 2 / Math.tan(2 * Math.PI / totalNum / 2)) - 3;
};

//点击按钮切换音频
var audio = document.getElementById('audio');
$('#toggle').on('tap',function(){
	//判断如果是暂停
	if(audio.paused){
		audio.play();
		$(this).text("暂停");
	}else{
		audio.pause();
		$(this).text("播放");
	}
});

//增加滑动事件
var startX = 0,
x = 0,
endX = 0;
var flag = false;//用于判断手机是否处于 Y 轴移动状态
$('#box').on('touchstart',function(e){
	//禁止默认的所有事件
	e.preventDefault();
	// console.log(e);
	//e.targetTouches[0].pageX  这个得到的是当前触摸位置在页面中的 X 坐标值
	// - x  是因为在下面这个 x 的值发了改变 但是因为是绕着 Y 轴旋转的 如果说 第二次手指触摸的位置和第一次是一样的 这个时候就会出现问题  这个 x 的值相当于是记录了一个移动的距离，他是相对与整个360°的空间而言的
	//这个 - x 相当于是将第二次手指刚开始触摸到的位置减去了上一次移动的位置这样得到的是上一次移动之后这一次触摸到的相对位置 因为整个的 box 360度的相对位置已经发生了改变
	startX = e.targetTouches[0].pageX - x;
});
$('#box').on('touchmove',function(e){
	if(!flag){
		//禁止默认的所有事件
		e.preventDefault();
		// console.log(e);
		endX = e.targetTouches[0].pageX;
		x =  endX - startX;
		box.style.transform = 'rotateY('+ x +'deg)';
	}
});
$('#box').on('touchend',function(e){
	//禁止默认的所有事件
	e.preventDefault();
	console.log('over');
});

//增加陀螺仪的功能
window.addEventListener('deviceorientation',function(){
	//处理 event 的 alpha beta gamma
	//这里需要的是沿着 Y 轴旋转的角度 所以获取 gamma 的角度
	var gamma = event.gamma;
	if(Math.abs(gamma) > 8){
		flag = true;
		box.style.transform = 'rotateY('+ gamma * 3 +'deg)';
	}else{
		flag = false;
	}
},true);