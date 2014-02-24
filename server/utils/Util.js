var fs = require('fs');
var logger = require('./log').logger;

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
			return next();
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

	return {
		extend: _extend,
		ensureAuthenticated: _ensureAuthenticated,
		uploadFile: _uploadFile
	}
}();

module.exports = Util;