var express = require('express');
var app = express();
var initController = require('./controller/index.js');
initController.init(app);


app.listen(3000, function () {
	console.log('Server is started');
});