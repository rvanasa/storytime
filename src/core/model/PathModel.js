module.exports = function(Model, Database)
{
	return Model('Path')
		.prop('story', 'Story')
		.prop('name', String)
		.prop('description', String).opt()
		.build(Database);
}