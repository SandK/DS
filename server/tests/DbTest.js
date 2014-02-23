var model = require('../model');
var should = require('should');
var UserDao = require('../dao/UserDao');
var User = model.User;

describe('User', function(){

    beforeEach(function(done){
        //clean the database:
        User.remove(done);
    });

// 调用UserDao父类DaoBase的方法
    describe('#countByQuery', function() {
        it('should 0', function(done) {
        	UserDao.countByQuery({}, function(e, number) {
        		number.should.be.exactly(0).and.be.a.Number;
        		done();
        	});
        });
    });

// 调用UserDao自己的方法
    describe('#save()', function() {
        it('should save', function(done) {
        	UserDao.register('kc', '123', function(e, user) {
                if (e) {
                    console.log("err");
                }
                user.username.should.equal("kc");
                user.age.should.exactly(0).and.be.a.Number;
        		done();
        	});
        });
    });
});