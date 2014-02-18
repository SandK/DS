var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User');
var logger = require('../utils/log').logger;
var Response = require('./Response');

module.exports = function (app) {
	// 登录
	app.post('/user', passport.authenticate('local'), function (req, res) {
		logger.info("login --------------------");
		res.send(new Response(true, "login success"));
	})

	// 获取用户
	app.get('/user', function (req, res) {
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
	})

	// 注册
	app.put('/user', function (req, res) {
		logger.info("register --------------------");

		var username = req.query.username;
		var password = req.query.password;
		logger.info("username: " + username + " password: " + password);

	    User.register(new User({username : req.query.username}), req.query.password, 
		    function(err, user) {
		      	if (!err) {
		      		res.send(new Response(true, "regiest success"));
		      	} else {
		      		res.send(new Response(false, "regiest fail"));
		      	}
		    }
	    );
	});

	// 注销
	app.delete('/user', function (req, res) {
		console.log("logout --------------------");
		req.logout();
		res.send(new Response(true, "logout success"));
	})

	// 修改用户信息
	app.options('/user/updateUser/:id', function (req, res) {
		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		delete req.body._id;
		User.update({_id: req.params.id}, req.body, function(err, affected) {
			if (err) {
				return res.send(new Response(false, "update fail", err));
			} else {
				return res.send(new Response(true, "update success"));
			}
		});
	})

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
	}
}
