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

	return {
		extend: _extend
	}
}();

module.exports = Util;