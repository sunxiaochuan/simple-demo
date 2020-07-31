$(function() {
	var i = 0;
	//建立 websocket 连接
	var socket = io.connect('http://localhost:3000');
	//收到 server 的链接确认
	socket.on('open',function() {
		console.log('已连接');
		socket.send('连接成功');
	})
})