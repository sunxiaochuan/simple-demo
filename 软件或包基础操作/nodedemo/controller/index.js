var indexModel = require('../model/indexModel.js');
var initController =  {
	init:function(app) {
		app.get('/', function (req, res) {
			res.send('Hello World!');
		});
		app.get('/a/b', function (req, res) {
			indexModel.getData(function(value) {
				res.send({
					value:value
				});
			});
		});
	}
};

module.exports = initController;