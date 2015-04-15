import {Controller} from 'lib/controller';
import * as UserService from 'services/user';

export default new Controller((router) => {

	router.put('/:name', (req, res) => {
		if (req.params.name === 'foo') {
			res.status(400).send({msg: 'name parameter cannot be foo'});
			return;
		}
		UserService.register({
			name: req.params.name,
		})
			.then(user => {
				res.status(200).send(user);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	});

	router.get('/:name', (req, res) => {
		if (req.params.name === 'foo') {
			res.status(400).send({msg: 'name parameter cannot be foo'})
			return;
		}
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
