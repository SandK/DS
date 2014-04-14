var log4js = require('log4js');
log4js.configure(__dirname + '/../utils/log4jsConf.json', {reloadSecs: 300});
  
var dateFileLog = log4js.getLogger('normal');
dateFileLog.setLevel('TRACE');

module.exports.logger = dateFileLog;
  
module.exports.use = function(app) {  
    //页面请求日志,用auto的话,默认级别是WARN  
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
    app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
}