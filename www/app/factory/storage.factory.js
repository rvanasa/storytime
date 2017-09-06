module.exports = function Storage($window)
{
	return {
		load(key)
		{
			var data = $window.localStorage.getItem(key);
			if(data) return JSON.parse(data);
		},
		save(key, data)
		{
			$window.localStorage.setItem(key, data != null ? JSON.stringify(data) : '');
		},
	};
}