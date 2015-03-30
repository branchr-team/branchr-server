import {Controller} from 'lib/controller';
import * as UserService from 'services/user';

export default new Controller((router) => {

	router.post('/:name', (req, res) => {
		UserService.register(req.body)
			.then(user => {
				res.status(200).send(user);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	});

	router.get('/:name', (req, res) => {
		UserService.getByName(req.params.name)
			.then(user => {
				res.status(200).send(user);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	});

});
