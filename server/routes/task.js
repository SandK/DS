var TaskDao = require('../dao/TaskDao');
var Logger = require('../utils/log').logger;
var Util = require('../utils/Util');
var Response = require('./Response');

// 创建任务
module.exports.createTask = function(req, res) {

	var _createTask = function(req, res)
	{
		if (!(Util.isValid(req.user) && Util.isValidString(req.user._id)) )
		{
			Logger.error("createTask|req.user is null");
			return res.send(new Response(false, -2));
		}

		if (!(Util.isValidString(req.body.taskName)
			&& Util.isValidString(req.body.desc)
			&& Util.isValidString(req.body.contactWay)
			&& Util.isValidString(req.body.reward)
			))
		{
			Logger.error("createTask|Param is error");
			return res.send(new Response(false, -3));
		}
		Logger.info("createTask|req.user._id:%s|taskName:%s|desc:%s|contactWay:%s|reward:%s|"
			, req.user._id, req.body.taskName, req.body.desc, req.body.contactWay, req.body.reward);

		var task = new Task({
			taskName: req.body.taskName,
			creator: req.user._id,
	        description: req.body.desc,
	        contactWay: req.body.contactWay,
	        reward: req.body.reward,
	        status: 1 // 状态设为未领取
		});

		TaskDao.create(task, function(error) {
			if (error) {
				return res.send(new Response(false, -1, error));
			}
			return res.send(new Response(true, 0));
		});
	};

	Util.ensureAuthenticated(req, res, _createTask);
}

// 分页查找任务列表
module.exports.findTaskByPage = function(req, res) {
	var userOnly = false;
	if (Util.isValid(req.params) && Util.isValidString(req.params.id))
	{
		userOnly = true;
	}

	if (!(Util.isValidNumber(req.body.pageNo) && req.body.pageNo > 0
		&& Util.isValidNumber(req.body.pageSize) && req.body.pageSize > 0
		&& Util.isValidNumber(req.body.startFrom) && req.body.startFrom >= 0
		&& Util.isValidNumber(req.body.count) && req.body.count > 0
		&& Util.isValidNumber(req.body.status)
		&& Util.isValidNumber(req.body.type)
		))
	{
		Logger.error("findTaskByPage|Param is error");
		return res.send(new Response(false, -3));
	}
	var _query, _fields;
	if (!userOnly) {
		_query = {
			status: req.body.status
			, type: req.body.type
		};
	} else {
		_query = {
			creator: req.params.id
			,status: req.body.status
			, type: req.body.type
		};
	}

	// TODO::之后根据前端所需的数据进行一部分筛选
	_fields = null;

	var startIndex = (req.body.pageNo - 1) * req.body.pageSize + req.body.startFrom;
	TaskDao.findTaskByPage(_query, _fields, startIndex, req.body.count, function(e, doc) {
		if (e) {
			return res.send(new Response(false, -1, error));
		}
		return res.send(new Response(true, 0, doc));
	});
}