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
}