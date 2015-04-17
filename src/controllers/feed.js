import {Controller} from 'lib/controller';
import {db} from 'db';
import {pmongo,ObjectId} from 'npm';

var feeds = db.collection('feeds');

export default new Controller((router) => {
	router.get('/:feedId', (req, res) => {
		feeds.findOne({_id: ObjectId(req.params.feedId)})
			.then(result => {
				res.status(200).send(result)
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});

	router.get('/', (req, res) => {
		feeds.find({}).toArray()
			.then(results => {
				res.status(200).send(results);
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});

});
