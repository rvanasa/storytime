module.exports = function Util()
{
	return {
		pick(arr)
		{
			return arr[Math.floor(Math.random() * arr.length)];
		},
	};
}