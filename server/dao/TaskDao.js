var DaoBase = require('./DaoBase'),
    models = require('./../model'),
    Task = require('./../model/').Task,
    Util = require('../utils/Util');

function TaskDao() {
	TaskDao.supr.call(this, Task);
}

// 根据任务名称进行查找
TaskDao.prototype.findByTaskName = function(_taskName, callback) {
	Task.findOne({taskName: _taskName})
	.populate('creator')
	.exec(function(e, doc) {
		callback(e, doc);
	});
}

Util.extend(TaskDao, DaoBase);
var taskDao = new TaskDao();

module.exports = taskDao;