var TaskDao = require('../dao/TaskDao');
var Task = require('./../model/').Task;
var Logger = require('../utils/log').logger;
var Util = require('../utils/Util');
var Response = require('./Response');

// 创建任务
module.exports.createTask = function(req, res) {

	var _createTask = function(req, res)
	{	
		Logger.info("createTask provider:%s", req.user.provider);
		if (!(Util.isValid(req.user) && Util.isValid(req.user._id)) )
		{
			Logger.error("createTask|-2|req.user is null");
			return res.send(new Response(false, -2));
		}

		if (!(Util.isValidString(req.body.taskName)
			&& Util.isValidString(req.body.desc)
			&& Util.isValidString(req.body.contactWay)
			&& Util.isValidString(req.body.reward)
			))
		{
			Logger.error("createTask|-3|Param is error");
			return res.send(new Response(false, -3));
		}
		Logger.trace("createTask|req.user._id:%s|taskName:%s|desc:%s|contactWay:%s|reward:%s|"
			, req.user._id, req.body.taskName, req.body.desc, req.body.contactWay, req.body.reward);

		var task = new Task({
			taskName: req.body.taskName,
			creator: req.user._id,
	        description: req.body.desc,
	        contactWay: req.body.contactWay,
	        reward: req.body.reward,
	        status: 1 // 状态设为未领取
		});

		TaskDao.create(task, function(e) {
			if (e) {
				Logger.error("createTask|-1|%s", e.message);
				return res.send(new Response(false, -1, e));
			}
			Logger.info("createTask|0|%s|%s|%s|%s|%s|"
				, req.user._id, req.body.taskName, req.body.desc, req.body.contactWay, req.body.reward);
			return res.send(new Response(true, 0));
		});
	};

	Util.ensureAuthenticated(req, res, _createTask);
};

// 分页查找任务列表
module.exports.findTaskByPage = function(req, res) {
	var userOnly = false;
	if (Util.isValid(req.params) && Util.isValidString(req.params.id))
	{
		userOnly = true;
	}
	var _pageNo, _pageSize, _startFrom, _count, _status, _type; 
	if (!(Util.isValidNumber(req.query.pageNo) && Number(req.query.pageNo) > 0
		&& Util.isValidNumber(req.query.pageSize) && Number(req.query.pageSize) > 0
		&& Util.isValidNumber(req.query.startFrom) && Number(req.query.startFrom) >= 0
		&& Util.isValidNumber(req.query.count) && Number(req.query.count) > 0 
		&& Number(req.query.startFrom) + Number(req.query.count) < Number(req.query.pageSize)
		&& Util.isValidNumber(req.query.status)
		&& Util.isValidNumber(req.query.type)
		))
	{
		Logger.error("findTaskByPage|-3|Param is error");
		return res.send(new Response(false, -3));
	}
	_pageNo = Number(req.query.pageNo);
	_pageSize = Number(req.query.pageSize);
	_startFrom = Number(req.query.startFrom);
	_count = Number(req.query.count);
	_status = Number(req.query.status);
	_type = Number(req.query.type);
	var _query, _fields;
	if (!userOnly) {
		_query = {
			status: _status
			, type: _type
		};
	} else {
		_query = {
			creator: req.params.id
			,status: _status
			, type: _type
		};
	}
	if (Util.isValid(req.query.acceptorId)) {
		_query["acceptor"] = req.query.acceptorId;
	}

	// TODO::之后根据前端所需的数据进行一部分筛选
	_fields = null;

	var startIndex = (_pageNo - 1) * _pageSize + _startFrom;
	TaskDao.findTaskByPage(_query, _fields, startIndex, _count, function(e, doc) {
		if (e) {
			Logger.error("findTaskByPage|-1|%s", e.message);
			return res.send(new Response(false, -1, e));
		}
		return res.send(new Response(true, 0, doc));
	});
};

// 接受任务
module.exports.acceptTask = function(req, res) {
	var _acceptTask = function(req, res) {
		if (!(Util.isValid(req.user) && Util.isValid(req.user._id)) )
		{
			Logger.error("acceptTask|-2|req.user is null");
			return res.send(new Response(false, -2));
		}

		if (!(Util.isValid(req.params) && Util.isValidString(req.params.taskId)) )
		{
			Logger.error("acceptTask|-3|TaskId is null");
			return res.send(new Response(false, -3));
		}

		Logger.trace("acceptTask|AcceptorId:%s|TaskId:%s", req.user._id, req.params.taskId);

		var _conditions = {
			_id: req.params.taskId
			, status: 1
			, creator: {$ne: req.user._id}
		};

		var _update = {
			status: 2
			, acceptor: [req.user._id]
		};
		TaskDao.findOneAndUpdate(_conditions, _update, [], function(e, doc) {
            if (e) {
				Logger.error("acceptTask|-1|%s", e.message);
            	return res.send(new Response(false, -1, e));
            }
            if (doc == null) {
                Logger.info("acceptTask|20031|Task can not be accepted|%s|%s", req.user._id, req.params.taskId);
				return res.send(new Response(false, 20031));
            } else {
                Logger.info("acceptTask|0|%s|%s", req.user._id, req.params.taskId);
				return res.send(new Response(true, 0));
            }
        });
	};

	Util.ensureAuthenticated(req, res, _acceptTask);
};

// 完成任务
module.exports.completeTask = function(req, res) {

	var _completeTask = function(req, res) {
		if (!(Util.isValid(req.user) && Util.isValid(req.user._id)) )
		{
			Logger.error("completeTask|-2|req.user is null");
			return res.send(new Response(false, -2));
		}

		if (!(Util.isValid(req.params) && Util.isValidString(req.params.taskId)) )
		{
			Logger.error("completeTask|-3|TaskId is null");
			return res.send(new Response(false, -3));
		}

		var acceptorId = req.user._id;
		var taskId = req.params.taskId;
		Logger.trace("completeTask|AcceptorId:%s|TaskId:%s", acceptorId, taskId);

		var _conditions = {
			_id: taskId
			, acceptor: [acceptorId] // TODO::现在领取人数量只为1
			, status: 2
		};

		var _update = {
			status: 3
		};

		TaskDao.findOneAndUpdate(_conditions, _update, null, function(e, doc) {
			if (e) {
				Logger.error("completeTask|-1|%s", e.message);
            	return res.send(new Response(false, -1, e));
            }
            if (doc) {
                Logger.info("completeTask|0|%s|%s", acceptorId, taskId);
				return res.send(new Response(true, 0));
            } else {
            	Logger.info("completeTask|20041|%s|%s", acceptorId, taskId);
            	return res.send(new Response(false, 20041));
            }
		});
	};

	Util.ensureAuthenticated(req, res, _completeTask);
};

// 显示单个任务
module.exports.showOneTaskDetail = function(req, res) {

	if (!(Util.isValid(req.params) && Util.isValidString(req.params.taskId)))
	{
		Logger.error("showOneTaskDetail|-3|TaskId is null");
		return res.send(new Response(false, -3));
	}

	TaskDao.getById(req.params.taskId, function(e, doc) {
		if (e) {
			Logger.error("showOneTaskDetail|-1|%s", e.message);
        	return res.send(new Response(false, -1, e));
        }
        if (null == doc) {
        	Logger.info("showOneTaskDetail|20051|%s", taskId);
        	return res.send(new Response(false, 20051));
        }
    	//Logger.info("showOneTaskDetail|0|%s", taskId);
    	return res.send(new Response(true, 0, doc));
	});
};