import * as config from 'config';
import * as routes from 'routes';
var express = require('express');
var bodyParser = require('body-parser');

export function run() {
	var app = new express();
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(routes.router())
	return app.listen(config.PORT, function() {
		console.log(`Listening on port ${config.PORT}`);
	});
}
