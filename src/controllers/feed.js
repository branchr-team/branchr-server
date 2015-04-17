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

	//router.get('/:feedId', (req, res) => {
		//feeds.findOne({'_id': Id(req.params.feedId)})
			//.then((f) => res.status(200).send(f))
			//.catch(() => res.status(500).send());
	//});

	//router.post('', (req, res) => {
		//let feed = req.body;
		//feeds.insert(feed)
			//.then(() => res.status(200).send(feed))
			//.catch(() => res.status(500).send(feed));
	//});

	//router.put('/:feedId', (req, res) => {
		//let feed = req.body;
		//feeds.update({
			//'_id': Id(req.params.feedId)
		//}, {
			//'$set': feed
		//})
			//.then(() => {
				//return feeds.findOne({'_id': Id(req.params.feedId)})
			//})
			//.then((f) => res.status(200).send(f))
			//.catch(() => res.status(500).send(feed));
	//});

});
