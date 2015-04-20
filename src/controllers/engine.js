import {Controller} from 'lib/controller';
import {Engine} from 'models/engine';

export default new Controller(router => {

	router.get('/:engineId', (req, res) => {
		Engine.findById(req.params.engineId, function(err, result) {
			if (err) 
				res.status(err.status || 500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result);
		});
	});

});
