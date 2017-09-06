var GoogleStrategy = require('passport-google-oauth2').Strategy;

var async = require('async');

module.exports = function(UserModel, GoogleAccountModel)
{
	return function(config)
	{
		return new GoogleStrategy({
			clientID: config.id,
			clientSecret: config.secret,
			callbackURL: config.callbackURL,
			scope: ['profile', 'email'],
		}, (accessToken, refreshToken, profile, done) => 
		{
			profile = profile._json;
			
			GoogleAccountModel
				.findOne({profileID: profile.id})
				.populate('user')
				.exec((err, account) =>
				{
					if(err) return done(err);
					
					if(!account) account = new GoogleAccountModel();
					if(!account.user) account.user = new UserModel();
					
					var user = account.user;
					
					account.profileID = profile.id;
					account.access = accessToken;
					account.refresh = refreshToken;
					account.email = profile.emails[0].value;
					
					Object.assign(user, {
						username: account.email.substring(0, account.email.indexOf('@')),///!!
						displayName: profile.displayName,
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						email: user.email || account.email,
					});
					
					async.parallel([user.save.bind(user), account.save.bind(account)], (err) => done(err, user));
				});
		});
	}
}