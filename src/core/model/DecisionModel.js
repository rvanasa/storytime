module.exports = function(Model, Database)
{
	return Model('Decision')
		.prop('story', 'Story')
		.prop('text', String)
		.prop('assign', Object).opt()
		.build(Database);
}