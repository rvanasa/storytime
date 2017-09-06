var path = require('path');

var express = require('express');

var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function()
{
	var app = express();
	
	app.set('views', path.resolve(__dirname, '../view'));
	app.set('view engine', 'ejs');
	
	app.use(compression());
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	
	return app;
}