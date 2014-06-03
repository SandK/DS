var passport = require('passport');
var user = require('./user');
var task = require('./task');
var wx = require('./wx');

module.exports = function(app) {
	// TODO::都要加上passport.authenticate?

	// 用户模块
	app.put('/user', user.register);
	app.post('/user', passport.authenticate('local'), user.login);
	app.delete('/user', user.logout);
	app.get('/user', user.getUserInfo);
	app.post('/user/:id', user.updateUserInfo);
	app.get('/auth/qq', passport.authenticate('qq'), function(req, res){});
	app.get('/auth/qq/callback', 
		passport.authenticate('qq', { failureRedirect: '/web' }),
		function(req, res) {
			res.redirect('/web');
		}
	);
	// 任务模块
	app.post('/task', task.createTask);
	app.get('/task', task.findTaskByPage);
	app.get('/task/:id', task.findTaskByPage);
	app.post('/task/:taskId', task.acceptTask);
	app.put('/task/:taskId', task.completeTask);
	app.get('/task/detail/:taskId', task.showOneTaskDetail);

	// 微信公众帐号相关
	//app.get('/', wx.checkSignature);
	app.use('/', wx.handleMsg);
};
