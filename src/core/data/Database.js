var mongoose = require('mongoose');

module.exports = function(Config)
{
	mongoose.Promise = Promise;
	
	var config = Config.database;
	return mongoose.createConnection(`mongodb://${encodeURI(config.username)}:${encodeURI(config.password)}@${config.url}`);
}