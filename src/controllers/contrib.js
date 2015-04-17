import {Controller} from 'lib/controller';
import {db} from 'db';
import {pmongo,ObjectId} from 'npm';

var contribs = db.collection('contribs');

export default new Controller(router => {
	router.get('/:contribId', (req, res) => {
		return contribs.findOne({_id: ObjectId(id)})
			.then(result => {
				res.status(200).send(result)
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});
	router.get('/', (req, res) => {
		return contribs.find({
			_id: ObjectId(id),
			feedId: req.query.feedId
		})
			.toArray()
			.then(result => {
				res.status(200).send(result)
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});
});
