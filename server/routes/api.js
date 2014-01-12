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
			res.send(401);
		}
	})

	// 注册
	app.post('/register', function (req, res) {
	    User.register(new User({username : req.body.username}), req.body.password, 
		    function(err, user) {
		      if (err) {
		        return res.send(err);
		      }
		      res.redirect('/confirm.html');
		    }
	    );
	});
}
