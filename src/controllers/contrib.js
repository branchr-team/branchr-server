import {Controller} from 'lib/controller';
import {Contrib} from 'models/contrib';

export default new Controller(router => {

	/**
	 * @api {get} /user/:id Request User information
	 * @apiName GetUser
	 * @apiGroup User
	 *
	 * @apiParam {Number} id Users unique ID.
	 *
	 * @apiSuccess {String} firstname Firstname of the User.
	 * @apiSuccess {String} lastname  Lastname of the User.
	 */
	router.get('/:contribId', (req, res) => {
		Contrib.findById(req.params.contribId, function(err, result) {
			if (err) 
				res.status(err.status || 500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result);
		});
	});

	// DELETE /contrib/:contribId
	router.delete('/:contribId', (req, res) => {
		Contrib.findByIdAndRemove(req.params.contribId, function(err, result) {
			if (err) 
				res.status(err.status || 500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result);
		});
	});

	// POST /contrib
	router.post('', (req, res) => {
		Contrib.create({
			engineId: req.body.engineId,
			feedId: req.body.feedId,
			params: req.body.params
		}, function(err, result) {
			if (err) 
				res.status(err.status || 500).send(err);
			else
				res.status(200).send(result);
		});
	});

	// GET /contrib/?feedId=<id>
	router.get('/', (req, res) => {
		let query = {};
		if (req.query.feedId) 
			query.feedId = req.query.feedId;
		Contrib.find(query, function(err, result) {
			if (err) 
				res.status(err.status || 500).send(err);
			else
				res.status(200).send(result);
		});
	});

});
