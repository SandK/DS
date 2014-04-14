var should = require('should');
var model = require('../model');
var Task = model.Task;
var UserDao = require('../dao/UserDao');
var TaskDao = require('../dao/TaskDao');

describe('Task', function(){

    // 测试保存
    describe('#save', function() {
	    beforeEach(function(done){
	        //clean the database:
	        Task.remove(done);
	    });

    	it('should success', function(done) {
    		UserDao.getByQuery({username:'kc'}, null, null, function(e, model) {
    			console.log(model[0]._id);
    			var task = new Task({
    				taskName: "TestTask",
    				creator: model[0]._id,
                    description: "description1",
                    contactWay: "999",
                    reward: "1RMB",
                    status: 1
    			});
    			TaskDao.create(task, function(o) {
    				console.log(o);
    			});
                var task1 = new Task({
                    taskName: "TestTask",
                    creator: model[0]._id,
                    description: "description2",
                    contactWay: "999",
                    reward: "2RMB",
                    status: 1
                });
                TaskDao.create(task1, function(o) {
                    console.log(o);
                });
    			done();
    		})
    	});
    });

    // 测试查找
    describe('#find', function() {
    	it('should success', function(done) {
    		TaskDao.findByTaskName('TestTask', function(e, doc) {
    			console.log(doc);
    			done();
    		});
    	});


        it('byPage should success', function(done) {
            var _query = {
                status: 1
                , type: 0
            };
            TaskDao.findTaskByPage(_query, null, 0, 1, function(e, doc) {
                if (e) throw(e);
                console.log(doc);
                done();
            });
        });
    });

    // 测试查找并修改
    describe('#Find And Modify', function() {
        it('should success', function(done) {
            TaskDao.findOneAndUpdate({reward: "2RMB", status: 1}, {status: 2}, [], function(e, doc) {
                if (e) throw(e);
                if (doc == null) {
                    console.log("Not Found");
                } else {
                    console.log(doc);
                }
                done();
            });
        });
    });
});