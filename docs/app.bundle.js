/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	
	var camelize = __webpack_require__(5);
	
	var angular = window.angular;
	
	var app = angular.module('app', ['ui.bootstrap']);
	
	register('component', __webpack_require__(6));
	register('directive', __webpack_require__(9));
	register('provider', __webpack_require__(10));
	register('constant', __webpack_require__(11));
	register('value', __webpack_require__(12));
	register('service', __webpack_require__(13));
	register('factory', __webpack_require__(16));
	register('filter', __webpack_require__(22));
	
	registerSpecial('run', __webpack_require__(23));
	registerSpecial('config', __webpack_require__(24));
	
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	    if (typeof obj === 'string') return camelCase(obj);
	    return walk(obj);
	};
	
	function walk (obj) {
	    if (!obj || typeof obj !== 'object') return obj;
	    if (isDate(obj) || isRegex(obj)) return obj;
	    if (isArray(obj)) return map(obj, walk);
	    return reduce(objectKeys(obj), function (acc, key) {
	        var camel = camelCase(key);
	        acc[camel] = walk(obj[key]);
	        return acc;
	    }, {});
	}
	
	function camelCase(str) {
	    return str.replace(/[_.-](\w|$)/g, function (_,x) {
	        return x.toUpperCase();
	    });
	}
	
	var isArray = Array.isArray || function (obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	};
	
	var isDate = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object Date]';
	};
	
	var isRegex = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	var has = Object.prototype.hasOwnProperty;
	var objectKeys = Object.keys || function (obj) {
	    var keys = [];
	    for (var key in obj) {
	        if (has.call(obj, key)) keys.push(key);
	    }
	    return keys;
	};
	
	function map (xs, f) {
	    if (xs.map) return xs.map(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        res.push(f(xs[i], i));
	    }
	    return res;
	}
	
	function reduce (xs, f, acc) {
	    if (xs.reduce) return xs.reduce(f, acc);
	    for (var i = 0; i < xs.length; i++) {
	        acc = f(acc, xs[i], i);
	    }
	    return acc;
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./component/app/app.component.js": 7
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = {
		template: __webpack_require__(8),
		controller($scope, $sce, Parser, StoryService, Context)
		{
			var $ctrl = this;
			
			StoryService.load('story/main.xml', Context())
				.then(story =>
				{
					window.STORY = story;
					
					$ctrl.story = story;
					StoryService.prepare(story);
				});
			
			var cache = {};
			$ctrl.display = function(text)
			{
				if(text in cache)
				{
					return cache[text];
				}
				if(text && $ctrl.story)
				{
					return cache[text] = $sce.trustAsHtml(Parser.parse(text, $ctrl.story.context));
				}
			}
			
			$ctrl.travel = function(path)
			{
				cache = {};
				$ctrl.story.travel(path);
				StoryService.save($ctrl.story);
			}
			
			$ctrl.reset = function()
			{
				cache = {};
				StoryService.reset($ctrl.story);
			}
			
			window.TRAVEL = function(path) {
				$scope.$apply(function() {
					$ctrl.travel(path);
				});
			}
			
			window.GRAPH = function() {
				$(document.body).append('<script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js">');
				setTimeout(() => {
					var container = $('.path-graph')[0] || $('<div class="path-graph">').appendTo(document.body)[0];
					container.style.width = '100vw';
					container.style.height = '100vh';
					var data = {
						nodes: Object.values($ctrl.story.context.events).map(e => ({id: e.id, label: e.id, color: {
							background: $ctrl.story.event == e ? '#DDFFBB' : (e.visited ? '#FFFFFF' : null),
						}})),
						edges: Object.values($ctrl.story.context.events)
							.flatMap(e => e.paths.flatMap(p => (p.ref || '').split(',')).map(r => ({from: e.id, to: r}))),
					};
					var network = new window.vis.Network(container, data, {
						layout: {
							improvedLayout: true,
							hierarchical: {
								direction: 'LR',
								nodeSpacing: 80,
								levelSeparation: 100,
							},
						},
						edges: {
							arrows: {
								to: { enabled: true, scaleFactor: 1, type: "arrow" },
							},
						},
						physics: {
							enabled: false,
						},
					});
	
				}, 100);			
			}
			
			setTimeout(() => {
				console.log('== DEBUG TOOLS ==');
				console.log('Story object: `STORY`');
				console.log('Event graph: `GRAPH()`');
				console.log('Travel to event: `TRAVEL(key)`');
			}, 1000);
		}
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"text-center\">\r\n    <div class=\"jumbotron\" ng-style=\"{background:'hsl(' + $ctrl.story.context.scope['ui:hue'] + ', 20%, 90%)'}\">\r\n        <h1 class=\"display-3 text-center header\" ng-bind=\"$ctrl.display('{ui:title}')\"></h1>\r\n        <p class=\"text-muted lead subheader\" ng-bind=\"$ctrl.display('{ui:subtitle}')\"></p>\r\n        <a class=\"small pt-3\" ng-click=\"$ctrl.reset()\" href=\"\">Create new story</a>\r\n    </div>\r\n    <div class=\"container pb-5\">\r\n    \t<p class=\"text-center py-5\" ng-bind-html=\"$ctrl.display($ctrl.story.event.text)\"></p>\r\n        <div ng-repeat=\"path in $ctrl.story.event.paths\" ng-if=\"!path.condition || path.condition()\">\r\n            <div class=\"btn d-block py-3 mt-3 mx-5\" ng-class=\"{'text-muted':path.traveled}\" ng-style=\"{background:'hsl(' + $ctrl.story.context.scope['ui:hue'] + ', 20%, 90%)'}\" ng-bind-html=\"$ctrl.display(path.text)\" ng-click=\"$ctrl.travel(path)\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 9;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 10;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 11;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 12;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./service/story.service.js": 14,
		"./service/xml-context.service.js": 15
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 13;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = function StoryService($http, Util, Storage, XmlContextService)
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
							// context.assign('visit:' + path.ref, this.step);
							this.step++;
							
							// var ref = Array.isArray(path.ref) ? Util.pick(path.ref) : path.ref;
							
							var ref;
							if(typeof path === 'string')
							{
								ref = path;
							}
							else
							{
								path.traveled = true;
								ref = Util.pick(path.ref.split(','));
							}
							
							if(ref == '*')
							{
								this.eventStack.shift();
								this.event = this.eventStack[0];
							}
							else
							{
								var event = context.findEvent(ref);
								if(event.assignments)
								{
									for(var id in event.assignments)
									{
										context.assign(id, event.assignments[id]);
									}
								}
								event.visited = true;
	
								this.event = event;
								if(event.scene)
								{
									this.eventStack.unshift(event);
								}
								else
								{
									this.eventStack[0] = event;
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
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

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
					var value = e.getAttribute('value');
					var invert = e.hasAttribute('invert');
					
					var cond = ifCondition = () => (value != null
							? (context.exists(key) ? context.get(key) : '') == Parser.parse(value, context)
							: context.exists(key) && !!context.get(key)) != invert;
					return crawlEvent($(e), event, context, cond);
				}
				else if(tag === 'else')
				{
					if(!ifCondition)
					{
						throw new Error('Invalid `else` positioning');
					}
					var cond = ifCondition;
					ifCondition = null;
					return crawlEvent($(e), event, context, () => !cond());
				}
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

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./factory/context.factory.js": 17,
		"./factory/parser.factory.js": 18,
		"./factory/range-composer.factory.js": 19,
		"./factory/storage.factory.js": 20,
		"./factory/util.factory.js": 21
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 16;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function Context(Parser, RangeComposer)
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
					this.scope[id] = Parser.parse(value, this);
				},
			};
		}
	}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function Parser($injector, Util)
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
				if(context.exists(id))
				{
					return context.get(id);
				}
				
				var delimIndex = id.indexOf(':');
				var composerID = id.substring(0, delimIndex);
				var keyID = id.substring(delimIndex + 1);
				
				var composer = context.findComposer(composerID);
				
				return this.parse(composer.generate(keyID), context);
				// if(!composer.dynamic)
				// {
				// 	context.assign(id, value);
				// }
			},
		};
		
		function wrap(type)
		{
			return ($0, $1) => '<span class="' + type + '">' + ($1 || $0) + '</span>';
		}
	}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = function RangeComposer()
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
	}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = function Storage($window)
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
	}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = function Util()
	{
		return {
			pick(arr)
			{
				return arr[Math.floor(Math.random() * arr.length)];
			},
		};
	}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 22;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 23;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 24;


/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map