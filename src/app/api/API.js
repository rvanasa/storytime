var express = require('express');
var x = require('xpose');

module.exports = function(App, LogMiddleware)
{
	var router = express.Router();
	App.use('/api', router);
	
	router.use(LogMiddleware);
	
}
