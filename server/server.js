var express = require('express');
var http = require('http');
var path = require('path');
var log = require('./utils/log');
var route = require('./routes/routes');

var app = express();

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.logger());
	app.use(express.methodOverride());
	app.use(express.cookieParser());

	// passport
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var User = require('./model').User;
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(app.router);
	app.use(express.static(path.join(__dirname, '../web/')));

	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
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