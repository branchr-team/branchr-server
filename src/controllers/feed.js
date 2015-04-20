import {Controller} from 'lib/controller';
import {Feed} from 'models/feed';

export default new Controller(router => {

	router.get('/:feedId', (req, res) => {
		Feed.findById(req.params.feedId, function(err, result) {
			if (err) 
				res.status(err.status || 500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result);
		});
	});

	router.get('/', (req, res) => {
		Feed.find({}, function(err, results) {
			if (err) 
				res.status(err.status || 500).send(err);
			else
				res.status(200).send(results);
		});
	});

});
