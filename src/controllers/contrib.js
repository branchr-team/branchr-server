import {Controller} from 'lib/controller';
import {db} from 'db';
import {pmongo,ObjectId} from 'npm';

var contribs = db.collection('contribs');

export default new Controller(router => {
	router.get('/:contribId', (req, res) => {
		contribs.findOne({_id: ObjectId(req.params.contribId)})
			.then(result => {
				res.status(200).send(result)
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});
	router.get('', (req, res) => {
		contribs.find({
			feedId: ObjectId(req.query.feedId)
		})
			.toArray()
			.then(result => {
				res.status(200).send(result)
			})
			.catch(err => {
				console.log(err);
				res.status(err.status || 500).send(err);
			});
	});

	router.post('' (req, res) => {
		contribs.insert({
			engineId: ObjectId(req.body.engineId),
			feedId: ObjectId(req.body.feedId),
			params: req.body.params
		})
	});
});
