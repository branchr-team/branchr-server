import UserController from 'controllers/user';

export function router() {
	var router = require('express').Router();

	router.use('/user', UserController.router);

	return router;
}
