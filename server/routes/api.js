var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User');

module.exports = function (app) {

	// 登录
	app.post('/login', passport.authenticate('local'), function (req, res) {
		if (req.user) {
			res.redirect('#/user');
		}
	})

	app.get('/login', function (req, res) {
		if (req.user) {
			res.send(req.user);
		} else {
			res.send('#/user');
		}
	})


	// 注册
	app.post('/register', function (req, res) {
	    User.register(new User({username : req.body.username}), req.body.password, 
		    function(err, user) {
		      if (err) {
		        return res.send(err);
		      }
		      res.redirect('/success.html');
		    }
	    );
	});

	// 注销
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})

	// 修改用户信息
	app.post('/user/updateUser/:id', function (req, res) {
		delete req.body._id;
		User.update({_id: req.params.id}, req.body, function(err, affected) {
			if (err) {
				return res.send(err);
			} else {
				return res.send(200);
			}
		});
	})

	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		//res.redirect('/login');
	}
}
