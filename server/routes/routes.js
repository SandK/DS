var passport = require('passport');
var user = require('./user');
var task = require('./task');

module.exports = function(app) {
	app.post('/user', passport.authenticate('local'), user.login);
	app.get('/user', user.getUserInfo);
	app.put('/user', user.register);
	app.delete('/user', user.logout);
	app.post('/user/:id', user.updateUserInfo);
};