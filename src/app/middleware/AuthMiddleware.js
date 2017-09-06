module.exports = function(Auth)
{
	return (req, res, next) =>
	{
		if(req.isAuthenticated())
		{
			if(!req.session.redirectURL) return next();
			
			var url = req.session.redirectURL;
			req.session.redirectURL = null;
			res.redirect(url);
		}
		else
		{
			req.session.redirectURL = req.query['redirect'] || req.originalUrl;
			res.redirect('/login');
		}
	}
}