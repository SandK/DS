var Logger = require('../utils/log').logger;
var Util = require('../utils/Util');
var config = require('../config');
var wechat = require('wechat');
var OAuth = require('wechat').OAuth;
var OAuthApi = new OAuth(config.wxAppId, config.wxAppSecret);

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
	var input = (message.Content || '').trim();
	var content = '';
	// Logic Handle
	if (input == '图文')
	{
		res.reply([
			{
				title: '测试图文消息',
				description: '图文',
				picurl: 'http://su.bdimg.com/static/superplus/img/logo_white_2a2fcb5a.png',
				url: 'http://www.baidu.com/'
			}
		]);
	}
	else if (input == '啊')
	{
		console.log("TestAuth1|" + OAuthApi.appid + "|" + OAuthApi.appsecret);
		res.reply("验证|" + OAuthApi.isAccessTokenValid());
	}
	else if (input == 'a')
	{
		console.log("TestAuth1|" + OAuthApi.appid + "|" + OAuthApi.appsecret + "|" + config.redirectUrl);
		OAuthApi.getAuthorizeURL(config.redirectUrl, 'snsapi_userinfo', 'STATE');
	}
	else
	{
		res.reply("我收到了|" + input);
	}
})
.image(function (message, req, res, next) {
	console.log(message);
	res.reply({
		type: "image",
		content: {
			mediaId: message.MediaId
		}
	});
})
.voice(function (message, req, res, next) {
	console.log(message);
	res.reply({
		type: "voice",
		content: {
			mediaId: message.MediaId
		}
	});
})
.video(function (message, req, res, next) {
	console.log(message);
	res.reply({
		type: "video",
		content: {
			mediaId: message.MediaId,
    		thumbMediaId: message.ThumbMediaId
		}
	});
})
.location(function (message, req, res, next) {
	console.log(message);
	res.reply("我收到了位置|" + message.Location_X + "|" + message.Location_Y + "|" + message.Scale);
})
.link(function (message, req, res, next) {
	console.log(message);
})
.event(function (message, req, res, next) {
	console.log(message);
	if (message.Event === 'subscribe')
	{
		res.reply("欢迎添加许愿墙");
	}
	else if (message.Event === 'unsubscribe')
	{
		res.reply("bye");
	}
	else
	{
		res.reply("暂未支持");
	}
})

);