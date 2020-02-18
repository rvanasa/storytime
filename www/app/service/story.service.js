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

						if(ref === '*')
						{
							this.eventStack.shift();
							this.event = this.eventStack[0];
						}
						else
						{
							var event = context.findEvent(ref || 'default');
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