var express = require('express');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
var api = require('./routes/api');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, '../public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect('mongodb://localhost:27017/local');

app.all('/', function(req, res) {
  res.sendfile('index.html', { root: "../public" });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});