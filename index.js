var argv = require('yargs').argv;

global.Promise = require('bluebird').Promise;

var config = require('./sorc.config');

require('sorc')(config, argv._[0], 'Server');