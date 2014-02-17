define(['modules/ds'], function(ds) {
	ds.factory('userService', function ($http) {
		return {
			regiest: function(params) {
				$http({
					method:'PUT', 
					url: '/user',
					params: {
						username: params.params.username,
						password: params.params.password
					}
				}).success(function(res) {
					params.callback.success && params.callback.success(res);
				}).error(function(data, status, headers, config) {
					params.callback.fail && params.callback.fail();
				});
			},

			login: function(params) {
				$http({
					method:'POST', 
					url: '/user',
					params: {
						username: params.params.username,
						password: params.params.password
					}
				}).success(function(res) {
					params.callback.success && params.callback.success(res);
				}).error(function(data, status, headers, config) {
					params.callback.fail && params.callback.fail();
				});
			},

			getUser: function(params) {
				$http({
					method:'GET',
					url: '/user'
				}).success(function(res) {
					params.callback.success && params.callback.success(res);
				}).error(function(data, status, headers, config) {
					params.callback.fail && params.callback.fail();
				});
			},

			logout: function(params) {
				$http({
					method:'DELETE',
					url: '/user'
				}).success(function(res) {
					params.callback.success && params.callback.success(res);
				}).error(function(data, status, headers, config) {
					params.callback.fail && params.callback.fail();
				});
			}
		};
	});
});