'use strict'

/* global angular */
angular.module('app', ['ui.bootstrap'])

.controller('appCtrl', function($scope, $sce, $window, Parser, StoryService, Context)
{
	StoryService.load('context/context.xml', Context())
		.then(story =>
		{
			window.STORY = story;
			
			$scope.story = story;
			StoryService.prepare(story);
		});
	
	var cache = {};
	$scope.display = function(text)
	{
		if(text in cache)
		{
			return cache[text];
		}
		if(text && $scope.story)
		{
			return cache[text] = $sce.trustAsHtml(Parser.parse(text, $scope.story.context));
		}
	}
	
	$scope.travel = function(path)
	{
		cache = {};
		$scope.story.travel(path);
		StoryService.save($scope.story);
	}
	
	$scope.reset = function()
	{
		cache = {};
		StoryService.reset($scope.story);
	}
})

.factory('Util', function()
{
	return {
		pick(arr)
		{
			return arr[Math.floor(Math.random() * arr.length)];
		},
	};
})

.factory('Storage', function($window)
{
	return {
		load(key)
		{
			var data = $window.localStorage.getItem(key);
			if(data) return JSON.parse(data);
		},
		save(key, data)
		{
			$window.localStorage.setItem(key, data != null ? JSON.stringify(data) : '');
		},
	};
})

.service('StoryService', function($http, Util, Storage, XmlContextService)
{
	this.load = function(path, context)
	{
		return XmlContextService.load(path, context)
			.then(context =>
			{
				return {
					context,
					eventStack: [],
					event: null,
					step: 0,
					travel(path)
					{
						path.traveled = true;
						// context.assign('visit:' + path.ref, this.step);
						this.step++;
						
						// var ref = Array.isArray(path.ref) ? Util.pick(path.ref) : path.ref;
						var ref = Util.pick(path.ref.split(','));
						if(ref == '*')
						{
							this.eventStack.shift();
							this.event = this.eventStack[0];
						}
						else
						{
							this.event = context.findEvent(ref);
							if(this.event.scene)
							{
								this.eventStack.unshift(this.event);
							}
							else
							{
								this.eventStack[0] = this.event;
								if(this.event.assignments)
								{
									for(var id in this.event.assignments)
									{
										context.assign(id, this.event.assignments[id]);
									}
								}
							}
						}
					},
				};
			});
	}
	
	this.prepare = function(story)
	{
		story.context.scope = Storage.load('scope') || {};
		story.travel({ref: story.context.exists('event:save') ? story.context.get('event:save') : 'start'});
		
		console.log('Loaded scope:', story.context.scope);
	}
	
	this.save = function(story)
	{
		story.context.assign('event:save', story.event.id);
		Storage.save('scope', story.context.scope);
	}
	
	this.reset = function(story)
	{
		Storage.save('scope', undefined);
		this.prepare(story);
	}
})

.service('XmlContextService', function($http, $q, Util, Parser)
{
	var $ = angular.element;
	
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
})

.factory('Parser', function($injector, Util)
{
	return {
		parse(text, context)
		{
			return String(text)
				.replace(/{([^}]+)}/g, ($0, $1) => this.eval($1, context))
				.replace(/(=)?"[^"]+"/g, ($0, $1) => $1 ? $0 : wrap('msg-quotes')($0))
				.replace(/~[^~]+~/g, wrap('msg-occurrence'))
				.replace(/\*([^*]+)\*/g, wrap('msg-bold'))
				.replace(/_([^_]+)_/g, wrap('msg-italics'))
				.replace(/\^([^_]+)\^/g, wrap('msg-uppercase'));
		},
		eval(id, context)
		{
			if(!context)
			{
				throw new Error('Context required to evaluate `' + id + '`');
			}
			if(id.indexOf(':') === -1)
			{
				return this.parse(context.findComposer(id).generate(), context);
			}
			var delimIndex = id.indexOf(':');
			var composerID = id.substring(0, delimIndex);
			var keyID = id.substring(delimIndex + 1);
			var value;
			if(context.exists(id))
			{
				value = context.get(id);
			}
			else
			{
				var composer = context.findComposer(composerID);
				value = this.parse(composer.generate(keyID), context);
				// if(!composer.dynamic)
				// {
				// 	context.assign(id, value);
				// }
			}
			return value;
		},
	};
	
	function wrap(type)
	{
		return ($0, $1) => '<span class="' + type + '">' + ($1 || $0) + '</span>';
	}
})

.factory('Context', function(Parser, RangeComposer)
{
	return function(parent)
	{
		return {
			composers: {
				range: RangeComposer,
			},
			events: {},
			scope: {},
			addComposer(composer)
			{
				if(!composer.id)
				{
					throw new Error('Invalid composer: ' + JSON.stringify(composer));
				}
				if(this.composers[composer.id])
				{
					throw new Error('Composer already exists: `' + composer.id + '`');
				}
				this.composers[composer.id] = composer;
			},
			findComposer(id)
			{
				var composer = this.composers[id];
				if(!composer)
				{
					throw new Error('Composer does not exist: `' + id + '`');
				}
				return composer;
			},
			addEvent(event)
			{
				if(!event.id)
				{
					throw new Error('Invalid event: ' + JSON.stringify(event));
				}
				var prevEvent = this.events[event.id];
				if(event.append)
				{
					if(!prevEvent)
					{
						throw new Error('No existing append target: `' + event.id + '`');
					}
					for(var key in event)
					{
						var value = event[key];
						if(Array.isArray(value) && Array.isArray(prevEvent[key]))
						{
							[].push.apply(prevEvent[key], value);
						}
						else
						{
							prevEvent[key] = value;
						}
					}
				}
				else if(prevEvent)
				{
					throw new Error('Event already exists: `' + prevEvent.id + '`');
				}
				this.events[event.id] = event;
			},
			findEvent(id)
			{
				var event = this.events[id];
				if(!event)
				{
					throw new Error('Event does not exist: `' + id + '`');
				}
				return event;
			},
			exists(id)
			{
				return !!this.scope[id];
			},
			get(id)
			{
				var value = this.scope[id];
				if(!value)
				{
					throw new Error('Value is not defined: `' + id + '`');
				}
				return value;
			},
			assign(id, value)
			{
				this.scope[id] = Parser.parse(value, this); /// parse or leave?
			},
		};
	}
})

.factory('RangeComposer', function()
{
	return {
		// dynamic: true,
		generate(value)
		{
			var min = 0, max = 0;
			if(value)
			{
				var index = value.indexOf('-');
				min = +value.substring(0, index);
				max = +value.substring(index + 1);
			}
			return Math.round(Math.random() * (max - min)) + min;
		},
	};
})

// .factory('StoryBuilder', function(Util, Parser)
// {
// 	return function()
// 	{
// 		return {
// 			events: {},
// 			currentEvent: null,
// 			define(id, text)
// 			{
// 				if(this.events[id])
// 				{
// 					throw new Error('Event already defined: `' + id + '`');
// 				}
// 				this.events[id] = this.currentEvent = {
// 					id,
// 					text,
// 					paths: [],
// 				};
// 				return this;
// 			},
// 			path(text, ref, condition)
// 			{
// 				var rawCondition = condition;
// 				if(typeof condition === 'string')
// 				{
// 					var expect = true;
// 					var id = condition;
// 					if(id.startsWith('!'))
// 					{
// 						expect = false;
// 						id = id.substring(1);
// 					}
// 					condition = () => expect === Parser.exists(id);
// 				}
// 				else if(typeof condition === 'object')
// 				{
// 					var obj = condition;
// 					condition = () => Object.keys(obj).every(id => Parser.eval(id) == Parser.parse(obj[id]));
// 				}
				
// 				this.currentEvent.paths.push({
// 					text,
// 					ref: typeof ref === 'number' ? this.currentEvent.id.replace(/[0-9]+$/, '') + ref : ref,
// 					condition,
// 					rawCondition,
// 				});
// 				return this;
// 			},
// 			set(id, value)
// 			{
// 				if(!this.currentEvent.vars)
// 				{
// 					this.currentEvent.vars = {};
// 				}
// 				this.currentEvent.vars[id] = value;
// 				return this;
// 			},
// 			context(context)
// 			{
// 				this.currentEvent.context = context || {};
// 				return this;
// 			},
// 			end()
// 			{
// 				return this;
// 			},
// 			find(id)
// 			{
// 				if(!this.events[id])
// 				{
// 					throw new Error('Event does not exist: `' + id + '`');
// 				}
// 				return this.events[id];
// 			},
// 			build(start)
// 			{
// 				var $ = window.$;
// 				var $result = $('<story>');
// 				for(var id in this.events)
// 				{
// 					var event = this.events[id];
// 					var $event = $('<event>')
// 						.attr('id', event.id);
// 					if(event.context)
// 					{
// 						$event.append($('<context>'));
// 					}
// 					if(event.vars)
// 					{
// 						Object.keys(event.vars).forEach(v => $event.append($('<assign>')
// 							.attr('key', v)
// 							.attr('value', event.vars[v] || '')));
// 					}
// 					$event.append($('<show>').html(event.text));
// 					$result.append($event);
// 					event.paths.forEach(path => $event.append($('<path>')
// 						.attr('ref', path.ref)
// 						.attr('visible', JSON.stringify(path.rawCondition))
// 						.text(path.text)
// 					));
// 				}
// 				console.log('<story>' + $result.html().replace(/<br>/g, '\\n') + '</story>');
				
// 				var story = this;
// 				var traverse = {
// 					eventStack: [],
// 					event: null,
// 					continue(path)
// 					{
// 						path.traveled = true;
						
// 						var ref = Array.isArray(path.ref) ? Util.pick(path.ref) : path.ref;
// 						if(ref == null)
// 						{
// 							this.eventStack.shift();
// 							this.event = this.eventStack[0];
// 						}
// 						else
// 						{
// 							this.event = story.find(ref);
// 							if(this.event.context)
// 							{
// 								this.eventStack.unshift(this.event);
// 							}
// 							else
// 							{
// 								this.eventStack[0] = this.event;
// 								if(this.event.vars)
// 								{
// 									for(var id in this.event.vars)
// 									{
// 										Parser.update(id, this.event.vars[id]);
// 									}
// 								}
// 							}
// 						}
// 					},
// 				};
// 				traverse.continue({ref: start});
// 				return traverse;
// 			},
// 		};
// 	}
// })

// .value('ParserTypes', {
// 	title: 'TitleOptions',
// 	subtitle: 'SubtitleOptions',
// 	loc: 'LocationOptions',
// 	char: 'CharacterOptions',
// 	adj: 'AdjectiveOptions',
// 	color: 'ColorOptions',
// 	goodAct: 'GoodActionOptions',
// 	evilAct: 'EvilActionOptions',
// 	town: 'TownOptions',
// 	motto: 'MottoOptions',
// 	weapon: 'WeaponOptions',
// 	steed: 'SteedOptions',
// 	food: 'FoodOptions',
// 	int: 'InterjectionOptions',
// })

// .run(function($injector, ParserTypes)
// {
// 	var $ = angular.element;
// 	for(var id in ParserTypes)
// 	{
// 		var options = $injector.get(ParserTypes[id]);
// 		var $options = $('<composer>').attr('id', id);
// 		options.forEach(o => $options.append($('<option>').html(o)));
// 		console.log($('<div>').append($('<story>').append($options)).html());
// 	}
// })