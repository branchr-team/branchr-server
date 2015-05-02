import {express, bodyParser} from 'npm';
import * as config from 'config';
import router from 'router';

export function run() {
	// Create new express app
	var app = new express();

	//// Load middleware

	// CORS
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Username, X-Token");
	  next();
	});

	// Body parsing
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	// Main router
	app.use(router());

	//// Start app
	return app.listen(config.PORT, function() {
		console.log(`Listening on port ${config.PORT}`);
	});
}
