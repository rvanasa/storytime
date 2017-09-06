module.exports = function RangeComposer()
{
	return {
		// dynamic: true,
		generate(value)
		{
			var min = 0, max = 0;
			if(value)
			{
				var index = value.indexOf('-');
				min = +value.substring(0, index);
				max = +value.substring(index + 1);
			}
			return Math.round(Math.random() * (max - min)) + min;
		},
	};
}