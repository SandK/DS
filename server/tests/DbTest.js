var db = require('../model');
var should = require('should');
var User = db.User;

describe('User', function(){

    beforeEach(function(done){
        //clean the database:
        User.remove(done);
    });

    describe('#save()', function() {
        it('should save', function(done) {
            var user = new User({username: 'gmart' })
            user.save(function(err) {
                if (err) return done(err);
                user.should.have.property('username','gmart');
                done();
            });
        });
    });
});