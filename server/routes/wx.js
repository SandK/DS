var Logger = require('../utils/log').logger;
var Util = require('../utils/Util');
var config = require('../config');
var wechat = require('wechat');

// 微信加密签名验证
module.exports.checkSignature = function(req, res) {
	Logger.info("================ Get|");
	Logger.info(req.query);
	if (Util.isValid(req.query.echostr)) {
		res.send(req.query.echostr);
		return ;
	}
	res.send("null");
};

// 公众帐号消息处理
module.exports.handleMsg = wechat(config.token, 

wechat.text(function(message, req, res, next) {
	console.log(message);
})
.image(function (message, req, res, next) {
	console.log(message);
})
.voice(function (message, req, res, next) {
	console.log(message);
})
.video(function (message, req, res, next) {
	console.log(message);
})
.location(function (message, req, res, next) {
	console.log(message);
})
.link(function (message, req, res, next) {
	console.log(message);
})
.event(function (message, req, res, next) {
	console.log(message);
})

);