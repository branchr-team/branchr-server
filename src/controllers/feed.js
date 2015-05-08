import {Controller} from 'lib/controller';
import {Feed} from 'models/feed';
import {auth} from 'controllers/auth';
export default new Controller(router => {

	router.get('/:feedId', (req, res) => {
		Feed.findById(req.params.feedId)
            .populate('owners', 'username')
            .exec(function(err, result) {
			if (err) 
				res.status(500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result);
		});
	});

	router.get('/', (req, res) => {
		Feed.find({})
            .populate('owners')
            .exec(function(err, results) {
			if (err) 
				res.status(err.status || 500).send(err);
			else
				res.status(200).send(results);
		});
	});

	// Make a new Feed
	router.post('', auth, (req, res) => {
		if (!req.body.owners) req.body.owners = [req.user.username];
		Feed.create(req.body, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else
				res.status(200).send(result);
		});
	});

	// Update an existing Feed
	router.put('/:feedId', auth, (req, res) => {
		Feed.findOne(req.params.feedId)
            .populate('owners')
            .exec(function(err, result) {
			if (err) 
				res.status(500).send(err);
			else if (!result)
				res.status(404).send();
			else {
                if (result.owners.map(o => o._id.toString()).indexOf(req.user._id.toString()) !== -1) {
                    Feed.findOneAndUpdate(
                        {_id: req.params.feedId},
                        req.body,
                        {new: true},
                        function (err, result2) {
                            if (err)
                                res.status(500).send(err);
                            res.status(200).send(result2);
                        });
                } else {
                    res.status(403).send({
                        msg: "User does not belong to feed's owners.",
                        owners: result.owners,
                        user: req.user,
                        truthiness: result.owners.indexOf(req.user._id)
                    });
                }
            }
		});
	});

});
