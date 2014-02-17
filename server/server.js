var log = require('./utils/log');
var express = require('express');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User.js');

var app = express();  
log.use(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger());
app.use(express.methodOverride());
app.use(express.cookieParser());

// passport
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, '../web/')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/local';
//var mongoUri = 'mongodb://sank:123@widmore.mongohq.com:10010/ds';
mongoose.connect(mongoUri, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + mongoUri);
  }
});

var logger = require('./utils/log').logger;
//logger.info("this is log");

var api = require('./routes/api')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});