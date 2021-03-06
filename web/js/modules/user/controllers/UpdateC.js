define([
	'common/config',
	'modules/ds'
], function(config, ds) {
	ds.controller('UpdateController', function ($rootScope, $scope, $http, userService) {
		$scope.user = null; // 当前用户对象

		/**
		 * 当前模板。
		 * @property templates
		 * @type {Object}
		 */
		$scope.templates = [{ 
			name: 'update.html', 
			url: 'views/user/update.html'
		}];

		// 监听 bootstrap 事件
		$('#userUpdate').on('show.bs.modal', function (e) {
			_updateShowCallback();
		});
		$("#userUpdate").on("shown.bs.modal", function() {
			_updateShownCallback();	
		});

		// 监听系统事件
		$scope.$on("showUpdateDialog", function(event, data) {
			_showUpdateDialog(data);		
		});

		/**
	     * 保存用户信息
	     * @method saveUser
	     */
		$scope.saveUser = function() {
			var form = new FormData();
			form.append("file", document.getElementById("avatarFile").files[0]);
			userService.resource.updateUser({
				userId: $scope.user._id,
				age: $scope.user.age,
				nickname: $scope.user.nickname
			}, form, function(res) {
				if (res.success) {
					$rootScope.$broadcast("getServerUser", {
						callback: function() {
							$("#userUpdate").modal('hide');
						}
					});
				} else {
					alert("save error: " + res.msg);
				}
			}, function() {
				alert("save fail");
			});
		};

		/**
	     * 改变用户头像文件回调方法
	     * @method fileChange
	     */
		$scope.fileChange = function(evt) {
		    var filereader = new FileReader();
    
			filereader.readAsDataURL(document.getElementById("avatarFile").files[0]);
        
		    filereader.onload = function(event) {
		        var blob = new Blob([event.target.result]);
		        var img = new Image();
		        img.onload = function() {
		        	var toAppend = document.getElementById("avatarImg");
		            var c = document.createElement('canvas');
			        c.width = 100;
			        c.height = 100;
			        var ctx = c.getContext('2d');
			        ctx.scale(c.width / img.width, c.height / img.height);
			        ctx.drawImage(img, 0, 0, img.width, img.height);
			        toAppend.title = 'Imported via upload, drawn in a canvas';
			        toAppend.src = c.toDataURL('image/png');
		        }
		        img.src = event.target.result;
		        img.title = 'Imported via file upload';
		    };
		};

		/**
	     * 打开更新信息窗口回调信息
	     * @method _updateShowCallback
	     * @private
	     */
		var _updateShowCallback = function() {
			$scope.template = $scope.templates[0];
		};

		/**
	     * 打开更新信息窗口回调信息
	     * @method _updateShownCallback
	     * @private
	     */
		var _updateShownCallback = function() {
			var avatarUrl = $scope.user.avatar? config.SERVER_URL + $scope.user.avatar : config.CLIENT_URL + "resource/avatar.png"; 
			var xhr = new XMLHttpRequest();
			xhr.open('GET', avatarUrl, true);
			xhr.responseType = 'arraybuffer';
			var toAppend = document.getElementById("avatarImg");

			xhr.onload = function(e) {
				if (this.status == 200) {
					var blob = new Blob([this.response], ["image/png"]);
					var img = new Image();
					img.src = window.URL.createObjectURL(blob);
					img.onload = function() {
						var c = document.createElement('canvas'); // Create canvas
						c.width = 100;
						c.height = 100;
						var ctx = c.getContext('2d');
						ctx.scale(c.width / img.width, c.height / img.height);
						ctx.drawImage(img, 0, 0, img.width, img.height);
						toAppend.src = c.toDataURL('image/png');
					}
				}
			};

			xhr.onerror = function(e) {
			    alert("Error " + e.target.status + " occurred while receiving the document.");
			};

			xhr.send();
		};

		/**
	     * 弹出更新信息框
	     * @method _showUpdateDialog
	     * @private
	     */
		var _showUpdateDialog = function(data) {
			$scope.user = data.user;
			$("#userUpdate").modal({
				show: true
			});	
		};
	});
});