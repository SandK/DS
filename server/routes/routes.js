var passport = require('passport');
var user = require('./user');
var task = require('./task');

module.exports = function(app) {
	// TODO::都要加上passport.authenticate?

	// 用户模块
	app.put('/user', user.register);
	app.post('/user', passport.authenticate('local'), user.login);
	app.delete('/user', user.logout);
	app.get('/user', user.getUserInfo);
	app.post('/user/:id', user.updateUserInfo);

	// 任务模块
	app.post('/task', task.createTask);
	app.get('/task/:id', task.findTaskByPage);
	app.post('/task/:taskId', task.acceptTask);
	app.put('/task/:taskId', task.completeTask);
	app.get('/task/detail/:taskId', task.showOneTaskDetail);
};