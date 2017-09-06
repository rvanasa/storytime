var express = require('express');

module.exports = function(App, Config, AuthMiddleware)
{
	App.use(AuthMiddleware);
	
	if(Config.resourcePath)
	{
		App.use(express.static(Config.resourcePath));
	}
	else
	{
		var webpack = require('webpack');
		var devMiddleware = require('webpack-dev-middleware');
		
		var compiler = webpack(require(this.config.basePath + '/webpack.config'));
		App.use(devMiddleware(compiler, {
			stats: {colors: true},
			inline: true,
			hot: true,
		}));
		App.use(express.static(this.config.basePath + '/www/assets'));
	}
}