module.exports = function(Model, Database)
{
	return Model('User')
		.prop('username', String)
		.prop('displayName', String)
		.prop('firstName', String)
		.prop('lastName', String)
		.prop('email', String).opt().lowercase()
		.build(Database);
}