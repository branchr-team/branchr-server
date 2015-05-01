import {Controller} from 'lib/controller';
import {Contrib} from 'models/contrib';
import {auth} from 'controllers/auth';

export default new Controller(router => {

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
	router.delete('/:contribId', auth, (req, res) => {
        Contrib.findOne(req.params.contribId, function(err, result) {
            if (err)
                res.status(500).send(err);
            else if (!result)
                res.status(404).send();
            else if (result.userId === req.user._id)
                Contrib.remove(req.params.contribId, function (err, result) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(200).send(result);
                });
            else
                res.status(403).send();
        });
    });

	// POST /contrib
	router.post('', auth, (req, res) => {
        req.body.userId = auth.user._id;
		Contrib.create(req.body, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else
				res.status(200).send(result);
		});
	});

	// GET /contrib/?feedId=<id>
	router.get('/', (req, res) => {
		let query = {};
		if (req.query.feedId) 
			query.feedId = req.query.feedId;
        if (req.query.userId)
            query.userId = req.query.userId;
		Contrib.find(query, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else
				res.status(200).send(result);
		});
	});

});
