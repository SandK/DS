var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' }, //控制台输出
    {
      type: 'file', //文件输出
      filename: 'logs/access.log', 
      maxLogSize: 10240,
      backups: 4,
      category: 'normal' 
    }
  ],
  replaceConsole: true
});
  
var dateFileLog = log4js.getLogger('normal');
dateFileLog.setLevel('INFO');

exports.logger = dateFileLog;
  
exports.use = function(app) {  
    //页面请求日志,用auto的话,默认级别是WARN  
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));  
    app.use(log4js.connectLogger(dateFileLog, {level:'debug', format:':method :url'}));  
}