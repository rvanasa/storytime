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