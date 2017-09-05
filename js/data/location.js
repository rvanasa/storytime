/* global angular */

angular.module('app')

.factory('LocationService', function(Utils, LocationOptions)
{
	return Utils.pick(LocationOptions);
})

.value('LocationOptions', [
	'Internland',
	'Mordor',
	'California',
	'Hell',
	'Narnia',
	'Hogwarts',
	'Apple Headquarters',
	'Russia',
	'Mars',
	'Europa',
	'Jupiter',
	'Intergalactic Federation Jurisdiction',
	'Chipotle',
	'Mesopotamia',
	'The Wizard\'s Tower',
	'Camelot',
	'Scotland',
	'America',
	'America but South',
	'the Void',
	'Forks, Washington',
	'Heaven',
	'Atlantis Before it was Underwater',
	'Egypt',
	'Neverland',
	'Rome',
	'the African Wildlands',
	'Tajikistan',
	'The Death Star',
	'Skyrim',
	'IKEA',
	'Disneyland'
])