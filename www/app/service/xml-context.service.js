var angular = window.angular;
var $ = angular.element;

module.exports = function XmlContextService($http, $q, Util, Parser)
{
	this.load = function(path, context)
	{
		return $http.get(path)
			.then(response => this.parse(response.data, path, context));
	};
	
	this.parse = function(data, path, context)
	{
		console.log('Parsing resource: ' + path);
		
		var $data = $(data);
		var tasks = [];
		tasks.push(parseAll($data.children('import'), $elem =>
		{
			var importPath = $elem.attr('path');
			if(!importPath)
			{
				throw new Error('No import path: `' + $elem[0] + '`');
			}
			importPath = /^([a-z]+:)?\/\//i.test($elem.path) ? importPath : path.substring(0, path.lastIndexOf('/') + 1) + importPath;
			return this.load(importPath, context);
		}));
		tasks.push(parseAll($data.children('composer'), $elem =>
		{
			var composer = {
				id: $elem.attr('id'),
				options: [],
				generate(name)
				{
					var value = Util.pick(this.options);
					if(name && !context.exists(this.id + ':' + name))
					{
						context.assign(this.id + ':' + name, value);
					}
					return value;
				},
			};
			$elem.children('option').each((i, e) => composer.options.push(parseText($(e).html(), context)));
			context.addComposer(composer);
			return composer;
		}));
		tasks.push(parseAll($data.children('event'), $elem =>
		{
			var event = {
				id: $elem.attr('id'),
				context: null,
				assignments: {},
				text: parseText($elem.children('show').html(), context),
				paths: [],
			};
			crawlEvent($elem, event, context);
			context.addEvent(event);
			return event;
		}));
		return $q.all(tasks)
			.then(() => context);
	}
	
	function parseAll($query, builder)
	{
		var array = [];
		$query.each((i, elem) => array.push(builder($(elem))));
		return $q.all(array);
	}
	
	function parseText(text, context)
	{
		return text;
	}
	
	function crawlEvent($elem, event, context, condition)
	{
		var ifCondition;
		$elem.children().each((i, e) =>
		{
			var tag = e.tagName.toLowerCase();
			if(tag === 'if')
			{
				var key = e.getAttribute('key');
				var value = e.getAttribute('value') || '';
				var invert = e.hasAttribute('invert');
				if(e.hasAttribute('value'))
				{
					invert = !invert;
				}
				ifCondition = () => ((context.exists(key) ? context.get(key) : '') == Parser.parse(value, context)) === invert;
				return crawlEvent($(e), event, context, ifCondition);
			}
			else if(tag === 'else')
			{
				if(!ifCondition)
				{
					throw new Error('Invalid `else` positioning');
				}
				condition = ifCondition;
				ifCondition = null;
				return crawlEvent($(e), event, context, () => !condition());
			}
			ifCondition = null;
			if(tag === 'show')
			{
				event.text = parseText(e.innerHTML, context);
			}
			else if(tag === 'path')
			{
				event.paths.push({
					ref: e.getAttribute('ref'),
					append: e.hasAttribute('append'),////
					condition,
					text: parseText(e.innerHTML, context),
				});
			}
			else if(tag === 'scene')
			{
				event.scene = {};
			}
			else if(tag === 'assign')
			{
				var assignments = event.assignments || (event.assignments = {});
				assignments[e.getAttribute('key')] = e.getAttribute('value');
			}
		});
	};
}