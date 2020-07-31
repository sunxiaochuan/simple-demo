var a = {},
b = {key:"b"},
c = {key:"c"};
a[b] = 123;
a[c] = 456;
console.log(a[b]);//456


//在浏览器控制台上测试、解析
//实际上的输出与 a 和 b 两个对象没有任何的关系
var a = {};
a[b] = 123;
a[c] = 456;
console.log(a);//Object {[object Object]: 456}
//上面的示例实际上将 b 或者是 c 属性当作是一个自定义的一个对象了，参照下面的示例可以一窥端倪
var a = {};
a[b] = 123;
console.log(a);//Object {[object Object]: 123}

//这个是想说明这个属性值如果是字符串的话与上面是截然不同的结果
var a = {};
a['b'] = 123;
a['c'] = 456;
console.log(a);//Object {b: 123, c: 456}
