import {Controller} from 'lib/controller';
import {db} from 'db';
import {pmongo} from 'npm';
var ObjectId = pmongo.ObjectId;

var engines = db.collection('engines');

export default new Controller(router => {
	router.get('/:engineId', (req, res) => {
		engines.findOne({_id: ObjectId(req.params.engineId)})
			.then(result => {
				res.status(200).send(result)
			})
			.catch(err => {
				res.status(err.status || 500).send(err);
			});
	});
});
