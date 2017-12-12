//本例是通过计算 11 - 0   +  79 - 73 这样的 用下一个字符串的前一个数字减去前一个字符串的第二个数字的方法求差 最后将所有的差相加 的示例
var dataArr = ["0,0","11,73","79,119","127,174","182,182","188,108","119,58","66,136","138,138"];
var result = 0;
dataArr.map((e,i) => { 
	if(dataArr[i + 1]){
		// console.log(dataArr[i + 1].split(','));
		result += dataArr[i + 1].split(',')[0] - e.split(',')[1];
	}
});
result;