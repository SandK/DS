var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//var userSchema = require('./UserModel').userSchema;

var taskSchema = new Schema({
	taskName: { type:String }, // 任务名
	creator: {type: ObjectId, ref: 'User'} // 发起人
});

mongoose.model('Task', taskSchema);