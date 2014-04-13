var should = require('should');
var UserDao = require('../dao/UserDao');

describe('User', function(){
/*
    // 测试注册功能
    describe('Register', function() {
        var _register;

        // 测试前清空数据库
        beforeEach(function(done){
            _register = User.model.register;
            User.model.remove(done);
        });

        // 注册成功
        it('should register success', function(done) {
            User.register("kc", "123", function(user) {
                user.username.should.equal("kc");
                user.age.should.exactly(0).and.be.a.Number;
                done();
            }, function(e) {
                throw(e);
                done();
            });
        });

        // 注册异常
        it('should register error', function(done) {
            User.model.register = function(user, password, failCallback, doc) {
                failCallback(new Error("mock register error"));
            };

            User.register("kc", "123", function(user) {
                throw("This shouldn't happen");
                done();
            }, function(e) {
                e.message.should.be.exactly("mock register error");
                done();
            });
        });


        // 测试后清空数据库
        afterEach(function(done){
            User.model.register = _register;
            User.model.remove(done);
        });
    });

    // 测试查找功能
    describe('FindUser', function() {
        var _findOne;

        // 测试前清空数据库,插入一个用户
        beforeEach(function(done) {
            _findOne = User.model.findOne;
            User.model.remove();
            User.register("kc", "123", function(user) {
                done();
            }, function(e) {
                done();
            });
        });

        // 根据用户名查找成功
        it ("by userName should success", function(done) {
            User.findByUserName("kc", function(user) {
                user.username.should.equal("kc");
                done();
            }, function(e) {
                throw(e);
                done();
            });
        });

        // 根据用户名查找成功但用户不存在
        it ("by userName should success but user is null", function(done) {
            User.model.findOne
            User.findByUserName("kc1", function(user) {
                done();
            }, function(e) {
                throw(e);
                done();
            });
        });


        // 根据用户名查找异常
        it ("by userName should error", function(done) {
            User.model.findOne = function(o, callback) {
                callback(new Error("mock findUser error"));
            };
            User.findByUserName("kc", function(user) {
                throw("This shouldn't happen");
                done();
            }, function(e) {
                e.message.should.be.exactly("mock findUser error");
                done();
            });
        });

        // 测试后清空数据库
        afterEach(function(done){
            User.model.findOne = _findOne;
            User.model.remove(done);
        });
    });

    // 测试修改功能
    describe('ModifyUserInfo', function() {
        // TODO::
    });
*/

    // 测试分页功能
    describe('QueryByPage', function() {

        // 根据用户名查找成功
        it ("should success", function(done) {
            UserDao.getByQueryPage({}, "nickname", 1, 3, function(e, model) {
                for (var i = 0; i < model.length; ++i) {
                    console.log(model[i]);
                }
                done();
            });
        });
    });
});