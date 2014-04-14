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
	.populate('creator', 'nickname avatar')
	.populate('acceptor', 'nickname avatar')
	.exec(function(e, doc) {
        if(e) return callback(e, null);

        return callback(null, doc);
    });
}

// 分页显示任务列表
TaskDao.prototype.findTaskByPage = function(query, fields, startIndex, count, callback) {
    // TODO::如果大数据量的话应该尽量避免使用skip来做分页
    // 可以用时间排序,用时间来做筛选条件达到跳过的目的
    var opt = {
        skip: startIndex
        , limit: count
    };
    // TODO::暂时按时间排序吧
	Task.find(query, fields, opt)
	.populate('creator', 'nickname avatar')
	.populate('acceptor', 'nickname avatar')
	.sort({createTime: -1})
	.exec(function(e, doc) {
        if(e) return callback(e, null);

        return callback(null, doc);
    });
}

Util.extend(TaskDao, DaoBase);
var taskDao = new TaskDao();

module.exports = taskDao;