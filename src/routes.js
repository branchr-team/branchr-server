import UserController from 'controllers/user';

export function router() {
	var router = require('express').Router();

	router.get('/', (req, res) => {
		res.send({msg: 'Hullo'});
	});
	router.use('/user', UserController.router);

	return router;
}
