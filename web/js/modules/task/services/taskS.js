define(['modules/ds'], function(ds) {
	ds.factory('taskService', function ($http, $resource) {
		return $resource("/task/:id", {
			id: ""
		}, {
			wish: {
				method: 'POST'
			},
			getList: {
				method: 'GET'
			},
			acceptTask: {
				method: 'POST'
			}
		});
	});
});