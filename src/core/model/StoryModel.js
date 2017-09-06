module.exports = function(Model, Database)
{
	return Model('Story')
		.prop('user', 'User')
		.prop('name', String)
		.prop('description', String).opt()
		.build(Database);
}