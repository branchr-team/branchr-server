import * as config from 'config';
import * as routes from 'routes';
var express = require('express');
var bodyParser = require('body-parser');

export function run() {
	// Create new express app
	var app = new express();

	//// Load middleware

	// CORS
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	// Body parsing
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	// Main router
	app.use(routes.router())

	//// Start app

	return app.listen(config.PORT, function() {
		console.log(`Listening on port ${config.PORT}`);
	});
}
