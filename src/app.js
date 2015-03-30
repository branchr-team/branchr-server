import * as routes from 'routes';
var express = require('express');
var bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

export function run() {
	var app = new express();
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(routes.router())
	return app.listen(port, function() {
		console.log(`Listening on port ${port}`);
	});
}
