var DaoBase = require('./DaoBase'),
    models = require('./../model'),
    User = require('./../model/').User,
    Util = require('../utils/Util');

function UserDao() {
	UserDao.supr.call(this, User);
}

// 注册
UserDao.prototype.register = function (username, password, callback) {
	var user = new User({
		username: username
		, nickname: ""
		, age: 0
	});
	User.register(user, password, function(e, doc) {
		callback(e, doc);
	});
};

Util.extend(UserDao, DaoBase);
var userDao = new UserDao();

module.exports = userDao;