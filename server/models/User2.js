var User = function () {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var passportLocalMongoose = require('passport-local-mongoose');

	var userSchema = new Schema({
		username: String,
		nickname: String,
		age: Number
	});
	userSchema.plugin(passportLocalMongoose);

	var _model = mongoose.model('User', userSchema);

	// 注册
	var _register = function(username, password, success, fail) {
		_model.register(new _model({username: username}), password, function(e, doc) {
			if (e) {
				fail(e);
			} else {
				success(doc);
			}
		});
	}

	// 根据用户名查找用户
	var _findByUserName = function(userName, success, fail) {
		_model.findOne({username: userName}, function(e, doc) {
			if (e) {
				fail(e);
			} else {
				success(doc);
			}
		});
	}

	// 修改用户信息
	var _modifyUserInfo = function(id, userInfo, success, fail) {
		_model.update({_id: id}, userInfo, function(e, affected) {
			if (e) {
				fail(e);
			} else {
				success(affected);
			}
		});
	}

	return {
		schema : userSchema,
		model : _model, 
		register : _register,
		findByUserName : _findByUserName,
		modifyUserInfo : _modifyUserInfo
	}

}();

module.exports = User;