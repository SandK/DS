var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//var userSchema = require('./UserModel').userSchema;

var taskSchema = new Schema({
	taskName: { type: String } // 任务名
	, creator: {type: ObjectId, ref: 'User'} // 发起人
	, description: {type: String} // 任务描述
	, contactWay: {type: String} // 联系方式
	, reward: {type: String} // 报酬(文字描述)
	, acceptor: [{type: ObjectId, ref: 'User'}] // 领取人
	, status: {type: Number, default: 0} // 任务状态(0:无效|1:未领取|2:已领取|3:已完成)
	, type: {type: Number, default: 0} // 任务类别(0:未分类)
	, createTime: {type: Date, default: Date.now} // 发起时间
});

mongoose.model('Task', taskSchema);