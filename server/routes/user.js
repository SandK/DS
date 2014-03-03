var passport = require('passport');
var UserDao = require('../dao/UserDao');
var logger = require('../utils/log').logger;
var Util = require('../utils/Util');
var Response = require('./Response');
var config = require('../config');

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
	if (!(req.params && req.params.id)) {
		return res.send(new Response(false, "update fail|id is null"));
	}

	if (!(req.user && req.user._id)) {
		return res.send(new Response(false, "update fail|user is null"));
	}
	var id = req.params.id;
	delete req.user._id;
	var user = req.user;
	logger.info("updateUser id: %s", id);

	// 更新用户数据库信息
	var updateUser = function() {
		console.log(user);
		UserDao.update({_id: id}, user, {}, function(e) {
			if (e) {
				console.log(e);
				return res.send(new Response(false, "update fail", e));
			}
			else {
				return res.send(new Response(true, "update success"));
			}
		});
	};

	// 上传文件处理
	var uploadAvatar = function() {
		var file = req.files.file;
		Util.uploadFile(file, function(success, e) {
			if (success) {
				// TODO:: 要先删除之前的头像
				user.avatar = config.uploadPath + file.name;
				// 更新用户数据库信息
				updateUser();
			} else {
				return res.send(new Response(false, "uploadFile error"), e);
			}
		});
	};

	// 保存数据
	if (!(req.files && req.files.file))
	{	
		Util.ensureAuthenticated(req, res, updateUser);
	} else
	{	
		Util.ensureAuthenticated(req, res, uploadAvatar);
	}

};

// 上传用户头像
exports.uploadUserAvatar = function(req, res) {
	if (!(req.files && req.files.uploadFile)) {
		return res.send(new Response(false, "uploadFile fail|file is null"));
	}
	var file = req.files.uploadFile;
	Util.uploadFile(file, function(success, e) {
		if (success) {
			return res.send(new Response(true, "uploadFile success", {
				filePath: config.uploadPath + file.name
			}));
		} else {
			return res.send(new Response(false, "uploadFile error"), e);
		}
	});
}