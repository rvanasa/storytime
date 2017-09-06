var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var passport = require('passport');

module.exports = function(App, Database, Config, UserModel, AuthRegistry)
{
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => UserModel.findById(id, done));
	
	App.use(session({
		store: new MongoStore({mongooseConnection: Database}),
		resave: false, saveUninitialized: false,
		secret: Config.session.secret,
	}));
	
	App.use(passport.initialize());
	App.use(passport.session());
	
	App.get('/login', (req, res) => res.redirect('/login/google'));
	App.get('/logout', (req, res) =>
	{
		req.logout();
		res.redirect('/');
	});
	
	for(var key in AuthRegistry)
	{
		if(AuthRegistry.hasOwnProperty(key))
		{
			var config = Object.assign({
				callbackURL: `${Config.server.protocol || 'https'}://${Config.server.domain}/login/${key}`,
			}, Config.provider[key]);
			
			var strategy = AuthRegistry[key](config);
			passport.use(key, strategy);
			
			App.get(`/login/${key}`, passport.authenticate(key, {
				successRedirect: '/',
				failureRedirect: '/login/error',
			}));
		}
	}
}