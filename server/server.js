var express = require('express');
var http = require('http');
var path = require('path');
var log = require('./utils/log');
var route = require('./routes/routes');
var config = require('./config');

var app = express();

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 80);
	app.use(express.favicon());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.logger());
	app.use(express.methodOverride());
	app.use(express.cookieParser());

	// upload
	app.use(require('connect-multiparty')({
		keepExtensions: true, 
		uploadDir: __dirname + '/tmp',
		limit: '2mb'
	}));

	// passport
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var QQStrategy = require('passport-qq').Strategy;
	var User = require('./model').User;
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(app.router);
	app.use(express.static(path.join(__dirname, '../')));

	passport.use(new LocalStrategy(User.authenticate()));
	passport.use(new QQStrategy({
		clientID: config.appKey,
		clientSecret: config.appSecret,
		callbackURL: "http://www.gmartds.tk/auth/qq/callback"},
		function(accessToken, refreshToken, profile, done) {
    	console.log(profile);
	    process.nextTick(function() {
	    	return done(null, profile);
	    });
	}));

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

// log
log.use(app);

// route
route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});