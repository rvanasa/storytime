module.exports = {
	template: require('./app.html'),
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