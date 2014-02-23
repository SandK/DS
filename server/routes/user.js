var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User');
var logger = require('../utils/log').logger;
var Response = require('./Response');

// 登录
exports.login = function(req, res) {
	logger.info("login --------------------");
	res.send(new Response(true, "login success"));
};

// 获取用户信息
exports.getUserInfo = function(req, res) {
	logger.info("get user --------------------");
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
	logger.info("updateUser --------------------");
	var id = req.params.id;
	delete req.body.user._id;
	var user = req.body.user;
	logger.info("updateUser|" + id);
	logger.info(user);
	ensureAuthenticated(req, res, function() {
		User.modifyUserInfo(id, user, function(affected) {
			return res.send(new Response(true, "update success"));
		}, function(e) {
			return res.send(new Response(false, "update fail", e));
		});
	});
};

// 注册
exports.register = function(req, res) {
	logger.info("register --------------------");

	var username = req.body.username;
	var password = req.body.password;
	logger.info("username: " + username + " password: " + password);

	User.register(username, password, function(user) {
		res.send(new Response(true, "regiest success"));
    }, function(e) {
    	res.send(new Response(false, "regiest fail"));
    });
};

// 注销
exports.logout = function(req, res) {
	logger.info("logout --------------------");
	req.logout();
	res.send(new Response(true, "logout success"));
}


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
}