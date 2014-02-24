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

	// upload
	app.use(require('connect-multiparty')({
		keepExtensions: true, 
		uploadDir: __dirname + '/tmp',
		limit: '2mb'
	}));

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

var fs = require('fs');
app.post('/upload', function(req, res) {
  var tmp_path = req.files.myFile.path;
  var target_path = __dirname + '/../web/resource/' + req.files.myFile.name;
  console.log(target_path);
  fs.rename(tmp_path, target_path, function(err) {
    if (err)
    {
      if (err) console.log(err);
    }
    fs.unlink(tmp_path, function() {
      if (err) console.log(err);
      console.log('file successfully deleted');
    });
  });
  res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});