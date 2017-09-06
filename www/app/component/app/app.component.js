module.exports = {
	template: require('./app.html'),
	controller($sce, $window, Parser, StoryService, Context)
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
	}
};