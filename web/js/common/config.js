define([], function (angular) { 
	var config = {
		SERVER_URL: window.location.origin + "/server/",
		CLIENT_URL: window.location.origin + "/web/",

		TASK_LIST: {
			PAGE_SIZE: 999999, // 每页大小
			COUNT: 20, // 每次加载条数
			STATUS: {
				NOT_ACCEPT: 1,
				ACCEPT: 2,
				DONE: 3
			},
			TYPE: {
				DEFAULT: 0
			}
		}
	}
	return config;
});