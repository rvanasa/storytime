require('../style/main.css');

var camelize = require('camelize');

var angular = window.angular;

var app = angular.module('app', ['ui.bootstrap']);

register('component', require.context('.', true, /\.component\.js$/i));
register('directive', require.context('.', true, /\.directive\.js$/i));
register('provider', require.context('.', true, /\.provider\.js$/i));
register('constant', require.context('.', true, /\.constant\.js$/i));
register('value', require.context('.', true, /\.value\.js$/i));
register('service', require.context('.', true, /\.service\.js$/i));
register('factory', require.context('.', true, /\.factory\.js$/i));
register('filter', require.context('.', true, /\.filter\.js$/i));

registerSpecial('run', require.context('.', true, /\.run\.js$/i));
registerSpecial('config', require.context('.', true, /\.config\.js$/i));

angular.element(() => angular.bootstrap(document, ['app']));

function requireAll(context)
{
	return context.keys().map(path =>
	{
		var index = path.lastIndexOf('/') + 1;
		return {
			name: camelize(path.substring(index, path.indexOf('.', index))),
			exports: context(path), 
		};
	});
}

function register(type, context)
{
	for(let file of requireAll(context))
	{
		app[type](file.exports.name || file.name, file.exports);
	}
}

function registerSpecial(type, context)
{
	for(let file of requireAll(context))
	{
		app[type](file.exports);
	}
}