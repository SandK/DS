var fs = require('fs');
var logger = require('./log').logger;
var Response = require('../routes/Response');

var Util = function () {
	// 继承
	var _extend = function(subCls,superCls) {    
	    //暂存子类原型  
	    var sbp = subCls.prototype;  
	    //重写子类原型--原型继承  
	    subCls.prototype = new superCls();  
	    //重写后一定要将constructor指回subCls  
	    subCls.prototype.constructor = subCls;  
	    //还原子类原型  
	    for(var atr in sbp) {  
	        subCls.prototype[atr] = sbp[atr];  
	    }  
	    //暂存父类    
	    subCls.supr = superCls;  
	};

	// 权限验证
	var _ensureAuthenticated = function(req, res, next) {
		if (req.isAuthenticated()) {
			return next(req, res);
		} else {
			return res.send(new Response(false, -4));
		}
	};

	// 上传文件
	var _uploadFile = function(file, callback) {
		if (null == file || undefined == file) {
			callback(false, null);
			return ;
		}
		var tmp_path = file.path;
		var target_path = __dirname + '/../../web/resource/' + file.name;
		// 复制到目标目录
		fs.rename(tmp_path, target_path, function(err) {
			if (err) {
				logger.error("uploadFile rename error: %s|%s|%s", tmp_path, target_path, e.message);
				// 复制文件失败要删除临时文件
				fs.unlink(tmp_path, function(err) {
					if (err) {
					logger.error("uploadFile unlink error: %s|%s|%s", tmp_path, target_path, e.message);
						callback(false, err);
						return ;
					}
				});
				callback(false, err);
				return ;
			}
		});
		callback(true, null);
	};

	// 对象是否合法
	var _isValid = function(o) {
		if (!o || null == o || typeof(o) == 'undefined') {
			return false;
		}
		return true;
	}

	// 对象是否为合法字符串
	var _isValidString = function(s) {
		if (_isValid(s)) {
			if (typeof(s) == 'string' && s.trim() != "") {
				return true;
			}
		}
		return false;
	}

	// 对象是否为数字
	var _isValidNumber = function(n) {
		if (_isValid(n)) {
			if (typeof(n) == 'number' || !isNaN(Number(n))) {
				return true;
			}
		}
		return false;
	}

	return {
		extend: _extend,
		ensureAuthenticated: _ensureAuthenticated,
		uploadFile: _uploadFile,
		isValid: _isValid,
		isValidString: _isValidString,
		isValidNumber: _isValidNumber
	}
}();

module.exports = Util;
