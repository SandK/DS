var should = require('should');
var demo = require('./demo');
var fs = require("fs");

// 单元测试组
describe('TestGroup', function(){
	before(function () {
		console.log('Pre something');
	});

	beforeEach(function () {
		console.log('beforeEach');
	});

	// 一个单元测试
	it('Test1', function() {
		demo.add(1, 1).should.be.exactly(2).and.be.a.Number;
	});

	// 异步方法的测试
	it('async', function (done) {
		demo.async(function (result) {
			done();
	    });
	});

	afterEach(function () {
		console.log('afterEach');
	});

	after(function () {
		console.log('Post something');
	});

});


// 模拟异常情况
describe("getContent", function () {
	var _readFile;
	before(function () {
		_readFile = fs.readFile;
		fs.readFile = function (filename, encoding, callback) {
			callback(new Error("mock readFile error"));
    	};
	});
	it("FileContent", function(done) {
		fs.readFile("test.txt", "utf8", function(err, data) {
			err.message.should.be.exactly("mock readFile error");
			//data.should.exactly("sank");
        	done();
    	})
	});
	after(function () {
		// 用完之后记得还原。否则影响其他case
		fs.readFile = _readFile;
	})
});