var log4js = require('log4js');
log4js.configure({
 appenders: [
   { type: 'console' },
   { type: 'file', filename: 'cheese.log', category: 'cheese' }
  ]
});

var logger = log4js.getLogger('cheese');
logger.setLevel('INFO');

var app = require('express').createServer();
app.configure(function() {
  app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));
});
app.get('/', function(req,res) {
  res.send('hello world');
});
app.listen(5000);