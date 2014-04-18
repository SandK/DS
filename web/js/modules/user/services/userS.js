define(['modules/ds'], function(ds) {
	ds.factory('userService', function ($http, $resource) {
		return {
			user: null,

			resource: $resource("/user/:userId", {
				userId: ''
			}, {
				regiest: {
					method:'PUT'
				},
				login: {
					method: 'POST'
				},
				getUser: {
					method: "GET"
				},
				updateUser: {
					method: 'POST',
					headers: {
						"Content-Type": undefined
					},
					transformRequest: function(data, headersGetter) {
						return data;
					}
				},
				logout: {
					method:'DELETE'
				}
			}),

			getUser: function() {
				return this.user;
			},

			setUser: function(user) {
				this.user = user;
			} 
		}

	// 	return {
	// 		regiest: function(params) {
	// 			$http({
	// 				method:'PUT',
	// 				url: '/user',
	// 				params: {
	// 					username: params.params.username,
	// 					password: params.params.password
	// 				}
	// 			}).success(function(res) {
	// 				params.callback.success && params.callback.success(res);
	// 			}).error(function(data, status, headers, config) {
	// 				params.callback.fail && params.callback.fail();
	// 			});
	// 		},

	// 		login: function(params) {
	// 			$http({
	// 				method:'POST', 
	// 				url: '/user',
	// 				params: {
	// 					username: params.params.username,
	// 					password: params.params.password
	// 				}
	// 			}).success(function(res) {
	// 				params.callback.success && params.callback.success(res);
	// 			}).error(function(data, status, headers, config) {
	// 				params.callback.fail && params.callback.fail();
	// 			});
	// 		},

	// 		getUser: function(params) {
	// 			$http({
	// 				method:'GET',
	// 				url: '/user'
	// 			}).success(function(res) {
	// 				params.callback.success && params.callback.success(res);
	// 			}).error(function(data, status, headers, config) {
	// 				params.callback.fail && params.callback.fail();
	// 			});
	// 		},

	// 		updateUser: function(params) {
	// 			$http({
	// 				method:'OPTIONS',
	// 				url: params.params.url,
	// 				params: params.params.user
	// 			}).success(function(res) {
	// 				params.callback.success && params.callback.success(res);
	// 			}).error(function(data, status, headers, config) {
	// 				params.callback.fail && params.callback.fail();
	// 			});
	// 		},

	// 		logout: function(params) {
	// 			$http({
	// 				method:'DELETE',
	// 				url: '/user'
	// 			}).success(function(res) {
	// 				params.callback.success && params.callback.success(res);
	// 			}).error(function(data, status, headers, config) {
	// 				params.callback.fail && params.callback.fail();
	// 			});
	// 		}
	// 	};
	});
});