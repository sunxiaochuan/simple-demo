//请求模块
var request = require('request');
var cheerio = require('cheerio');
//爬虫
var indexModel = {
	getData:function(fn) {
		request('https://www.mi.com/', function (error, response, body) {
			if(!error && response.statusCode == 200){
				console.log(body);
				var $ = cheerio.load(body);
				console.log($('.J_navMainList li').length);
				fn($('.J_navMainList li').length);
			}
		});
	}
}

module.exports = indexModel;