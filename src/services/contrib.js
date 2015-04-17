import {Controller} from 'lib/controller';
import * as ContribService from 'services/contrib';
export default new Controller((router) => {
	router.get('/:contribId', (req, res) => {
		ContribService.getById(req.params.contribId)
			.then(result => res.status(200).send(result))
			.catch(err => res.status(err.status || 500).send(err));
	});
});
