function test() {
	this.a = 1;
};
test.prototype.method_name = function(){
	console.log(this.a + 'xiaochuan');
};