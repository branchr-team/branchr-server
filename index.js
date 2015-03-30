var System = require('systemjs');
System.config({
	baseURL: './src'
});
System.import('app').then(function(app) {
	app.run();
});
