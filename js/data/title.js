/* global angular */

angular.module('app')

.factory('Title', function(Parser)
{
	return Parser.parse('{title:main}');
})

.factory('Subtitle', function(Parser)
{
	return Parser.parse('{subtitle:main}');
})

.factory('Year', function()
{
	return Math.floor(Math.random() * 999) + 1100;
})

.value('TitleOptions',  [
	'Adventures in {loc:main}',
	'Shadow of {loc:main}',
	'The Fires of {loc:main}',
	'The Chronicles of {loc:main}',
	'{color:main} {food:main}',
	'Adventures of {char:main}',
	'{char:main}: A Biography',
	'{char:main} of {loc:main}',
	'A Tale of Two {loc:main}s',
	'The {color:main} Eye of {char:nemesis}',
	'{char:nemesis}\'s Revenge',
	'{char:main}: The Hero Of {loc:main}',
	'{char:main}: The Man, The Myth, The Legend',
	'The Fields of {loc:main}',
	'The End of {loc:main}',
	'Dawn of {loc:main}',
	'{loc:main}: A History',
	'{town}\'s Rise To Greatness',
	'The {weapon:main} of {char:main}',
	'Society of {loc:main}',
	'{loc:main} Times'
])

.value('SubtitleOptions', [
	'and the {adj:nemesis} {char:nemesis}',
	'a tale of one {adj}, {adj:dislike} {char:main}',
	'the definitive edition',
	'third edition, published 1879',
	'you won\'t get entertainment like this anywhere else',
	'the fourth installation of the wildly famous {char:main} series',
	'now on CD ROM',
	'now available in theaters',
	'the {adj:dislike} story you\'ve been waiting for',
	'soundtrack very unavailable',
	'reviewers give it '+(Math.floor(Math.random() * 3)+2)+' stars',
	'exclusively released in the African wildlands',
	'featuring the town of {town:main}',
	'Cat-Jesus not included',
	'never before seen bonus features',
	'hardcore {weapon:main} action',
	'featuring {char:main} and a {weapon:main}',
	'featuring the all-new \'don\'t touch the road\' DLC',
	'only $17.99'
])