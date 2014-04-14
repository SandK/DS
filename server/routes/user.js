var passport = require('passport');
var UserDao = require('../dao/UserDao');
var Logger = require('../utils/log').logger;
var Util = require('../utils/Util');
var Response = require('./Response');
var Config = require('../config');

// 注册
exports.register = function(req, res) {

	var username = req.body.username;
	var password = req.body.password;
	Logger.trace("register|register username: %s, password: %s", username, password);

	UserDao.register(username, password, function(e, user) {
		if (e) {
			Logger.error("register|-1|regist fail|%s", e.message);
			return res.send(new Response(false, -1, e));
		}
		else {
			Logger.info("register|0|%s|%s", username, password);
			return res.send(new Response(true, 0));
		}
	});
};

// 登录
exports.login = function(req, res) {
	Logger.trace("login");
	res.send(new Response(true, 0));
};

// 注销
exports.logout = function(req, res) {
	Logger.trace("logout");
	req.logout();
	res.send(new Response(true, 0));
}

// 获取用户信息
exports.getUserInfo = function(req, res) {
	if (req.user) {
		res.send(new Response(true, 0, {
			user: req.user
		}));
	} else {
		res.send(new Response(false, -2, {
			user: null
		}));
	}
};

// 修改用户信息
exports.updateUserInfo = function(req, res) {
	if (!(Util.isValid(req.params) && Util.isValid(req.params.id)) ) {
		return res.send(new Response(false, 10051));
	}

	if (!(Util.isValid(req.user) && Util.isValid(req.user._id)) ) {
		return res.send(new Response(false, -2));
	}
	var id = req.params.id;
	delete req.user._id;
	var user = {};
	user.nickname = req.query.nickname;
	user.age = req.query.age;
	Logger.trace("updateUser id: %s, nickname: %s, age: %s", id, req.user.nickname, req.user.age);

	// 更新用户数据库信息
	var updateUser = function() {
		UserDao.update({_id: id}, user, {}, function(e) {
			if (e) {
				Logger.error("updateUserInfo|10054|updateUser error|%s", e.message);
				return res.send(new Response(false, 10054, e));
			}
			else {
				Logger.info("updateUser|0|id: %s, nickname: %s, age: %s", id, req.user.nickname, req.user.age);
				return res.send(new Response(true, 0));
			}
		});
	};

	// 上传文件处理
	var uploadAvatar = function() {
		var file = req.files.file;
		Util.uploadFile(file, function(success, e) {
			if (success) {
				// TODO:: 要先删除之前的头像
				user.avatar = Config.uploadPath + file.name;
				// 更新用户数据库信息
				updateUser();
			} else {
				Logger.error("updateUserInfo|10053|uploadAvatar error|%s", e.message);
				return res.send(new Response(false, 10053), e);
			}
		});
	};

	// 保存数据
	if (!(req.files && req.files.file))
	{	
		Util.ensureAuthenticated(req, res, updateUser)
	} else
	{	
		Util.ensureAuthenticated(req, res, uploadAvatar)
	}

};