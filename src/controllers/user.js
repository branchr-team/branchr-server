import {Controller} from 'lib/controller';
import * as UserService from 'services/user';

export default new Controller((router) => {

	// POST {base}/user Register a user.
	router.post('', (req, res) => {
		UserService.register(req.body)
			.then(user => {
				res.status(200).send(user);
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});

	router.get('/:name', (req, res) => {
		UserService.getByName(req.params.name)
			.then(user => {
				res.status(200).send(user);
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});

	router.delete('/:name', (req, res) => {
		UserService.unregisterByName(req.params.name)
			.then(result => {
				res.status(200).send(result);
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});

	router.get('/', (req, res) => {
		UserService.getAll()
			.then(users => {
				res.status(200).send(users);
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});

});
