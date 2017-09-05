/* global angular */

angular.module('app')

.factory('CharacterService', function(Utils, CharacterOptions)
{
	return Utils.pick(CharacterOptions);
})

.value('CharacterOptions', [
	'Steve Wozniak',
	'Steve From Minecraft',
	'Steve Martin',
	'Darth Vader',
	'Phil',
	'He-Man',
	'Guy who looks like {char}',
	'Woman who looks like {char}',
	'Arnold Schwarzenegger',
	'Jon from Garfield',
	'Your Mom',
	'Sherlock Holmes',
	'Roberto',
	'Margeret',
	'Little Billy',
	'Captain Picard',
	'Mazer Rackham',
	'Ender',
	'The Black Knight',
	'Big Man Hambert',
	'Chester',
	'Taylor Swift',
	'Harry Potter',
	'Elon Musk',
	'Eragon',
	'Stephen Hawking',
	'Scotty',
	'Happy Intern',
	'Sad Intern',
	'Ugly Stepsister',
	'Ayn Rand',
	'Isaac Newton',
	'Chef Bobo',
	'Caesar',
	'Sauron',
	'Dragonborn',
	'Batman',
	'Hulk Hogan',
	'Vladimir Putin',
	'Mickey Mouse',
	'Hagrid',
	'Ivan',
]);