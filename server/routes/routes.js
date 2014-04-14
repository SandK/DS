var passport = require('passport');
var user = require('./user');
var task = require('./task');

module.exports = function(app) {
	// 用户模块
	app.put('/user', user.register);
	app.post('/user', passport.authenticate('local'), user.login);
	app.delete('/user', user.logout);
	app.get('/user', user.getUserInfo);
	app.post('/user/:id', user.updateUserInfo);
	app.post('/uploadAvatar', user.uploadUserAvatar);

	// 任务模块
	app.post('/task', task.createTask);
	app.get('/task/:id', task.findTaskByPage);
	app.post('/task/:taskId', task.acceptTask);
	
};