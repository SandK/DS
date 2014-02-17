var log4js = require('log4js');
log4js.configure('utils/log4jsConf.json', {reloadSecs: 300});
  
var dateFileLog = log4js.getLogger('normal');
dateFileLog.setLevel('INFO');

exports.logger = dateFileLog;
  
exports.use = function(app) {  
    //页面请求日志,用auto的话,默认级别是WARN  
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
    app.use(log4js.connectLogger(dateFileLog, {level:'debug', format:':method :url'}));  
}