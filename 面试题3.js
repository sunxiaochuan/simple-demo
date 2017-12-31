const map = new Map();
map.set({a:123},555);
alert(map.get({a:123}));//undefined

//在浏览器控制台上测试、解析
//实验证明 get 和 set 的参数是键值对的形式且这个键不能是原生的对象 必须要通过一个变量来进行调用
const map = new Map();
const myobj = {a:123};
map.set(myobj,555);
alert(map.get(myobj));//555

//参考链接：http://es6.ruanyifeng.com/#docs/set-map#Map

//拓展
//还有一个与上面的 Map 很类似的 WeakMap 方法  参考链接：http://es6.ruanyifeng.com/#docs/set-map#WeakMap-的用途
//可以将上面的方法改造成下面这样的
const weakmap = new WeakMap();
const myobj = {a:123};
weakmap.set(myobj,555);
alert(weakmap.get(myobj));//555

//测试数组是否也是如上的写法，结果证明数组是不可以这样写的
var arr = [{key:"xiaochuan"},555];
arr.{key:"xiaochuan"};//Uncaught SyntaxError: Unexpected token {

var myobj = {key:"xiaochuan"};
var arr = [myobj,555];
arr.myobj;//undefined