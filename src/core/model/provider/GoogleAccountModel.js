module.exports = function(Database, Model)
{
	return Model('GoogleAccount')
		.prop('profileID', String).unique()
		.prop('user', 'User')
		.prop('access', String)
		.prop('refresh', String).opt()
		.prop('email', String).lowercase()
		.build(Database);
}