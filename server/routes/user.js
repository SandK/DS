var passport = require('passport');
var UserDao = require('../dao/UserDao');
var logger = require('../utils/log').logger;
var Util = require('../utils/Util');
var Response = require('./Response');

// 注册
exports.register = function(req, res) {

	var username = req.body.username;
	var password = req.body.password;
	logger.info("register username: %s, password: %s", username, password);

	UserDao.register(username, password, function(e, user) {
		if (e) {
			return res.send(new Response(false, "regiest fail", e));
		}
		else {
			return res.send(new Response(true, "regiest success"));
		}
	});
};

// 登录
exports.login = function(req, res) {
	logger.info("login");
	res.send(new Response(true, "login success"));
};

// 注销
exports.logout = function(req, res) {
	logger.info("logout");
	req.logout();
	res.send(new Response(true, "logout success"));
}

// 获取用户信息
exports.getUserInfo = function(req, res) {
	if (req.user) {
		res.send(new Response(true, "get user success", {
			user: req.user
		}));
	} else {
		res.send(new Response(false, "get user fail", {
			user: null
		}));
	}
};

// 修改用户信息
exports.updateUserInfo = function(req, res) {
	var id = req.params.id;
	delete req.body.user._id;
	var user = req.body.user;
	logger.info("updateUser id: %s", id);

	Util.ensureAuthenticated(req, res, function() {
		UserDao.update({_id:id}, user, {}, function(e) {
			if (e) {
				return res.send(new Response(false, "update fail", e));
			}
			else {
				return res.send(new Response(true, "update success"));
			}
		});
	});
};

// 上传用户头像
exports.uploadUserAvatar = function(req, res) {
	var file = req.files.uploadFile;
	if (null == file || undefined == file) {
		return res.send(new Response(false, "uploadFile fail|file is null"));
	}
	Util.uploadFile(file, function(success, e) {
		if (success) {
			return res.send(new Response(true, "uploadFile success", {
				filePath: 'resource/' + file.name
			}));
		} else {
			return res.send(new Response(false, "uploadFile error"), e);
		}
	});
}