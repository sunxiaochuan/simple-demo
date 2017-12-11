var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
const $ = cheerio.load('<h2 class="title">Hello world</h2>')
app.get('/', function(req, res){
	request('http://www.jikexueyuan.com/', function (error, response, body) {
		if(!error && response.statusCode == 200){
			//body 为百度网址的源代码
			console.log('body:', body); // Print the HTML for the Google homepage.
			var $ = cheerio.load(body);//当前的 $ 他是一个拿到了整个 body 的前端选择器
			// res.send('hello world');
			res.json({
				'Classname':$('.aside-allCategory li').length
			})
		}
	});
});

app.listen(3000);