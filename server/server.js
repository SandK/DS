var express = require('express');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/User.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var app = express();

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
app.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect('mongodb://localhost:27017/local');

var api = require('./routes/api')(app);

app.all('/', function(req, res) {
  res.sendfile('index.html', { root: "../public" });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});