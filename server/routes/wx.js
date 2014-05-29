var Logger = require('../utils/log').logger;
var Util = require('../utils/Util');

// 微信加密签名验证
module.exports.checkSignature = function(req, res) {
	Logger.info("================ Get|");
	Logger.info(req.query);
	if (Util.isValid(req.query.signature)) {
		res.send(req.query.signature);
		return ;
	}
	res.send("null");
};