define(['modules/ds'], function(ds) {
	ds.factory('taskService', function ($http, $resource) {
		return $resource("/task/:userId", {
			userId: ""
		}, {
			wish: {
				method: 'POST'
			},
			getList: {
				method: 'GET'
			}
		});
	});
});