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
	});
});