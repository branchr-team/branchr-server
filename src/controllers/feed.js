import {Controller} from 'lib/controller';
import {Feed} from 'models/feed';
import {Engine} from 'models/engine';
import {Contrib} from 'models/contrib';
import {User} from 'models/user';
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
		if (!req.body.owners) req.body.owners = [req.user._id];
		Feed.create(req.body, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else
				res.status(200).send(result);
		});
	});

    router.get('/engine/:feedId', auth, (req, res) => {
        Feed.findOne(req.params.feedId)
            .populate('owners')
            .exec(function(err, result) {
                console.log(result.owners, req.user.username);
                res.status(200).send();
            });
    });

    router.put('/:feedId/engine', auth, (req, res) => {
        Feed.findOne(req.params.feedId)
            .populate('owners')
            .exec(function(err, result) {
                console.log(result.owners, req.user.username);
                if (err)
                    res.status(500).send(err);
                else if (!result)
                    res.status(404).send();
                else {
                    if (result.owners.reduce((prev, cur) => prev || cur.username === req.user.username, false)) {
                        Engine.create(req.body, function(err2, result2) {
                            if (err2)
                                res.status(500).send(err2);
                            else if (!result2)
                                res.status(404).send();
                            else
                                Feed.findOneAndUpdate(
                                    {_id: req.params.feedId},
                                    {$set: {engine: result2._id}},
                                    {new: true},
                                    function (err3, result3) {
                                        if (err3)
                                            res.status(500).send(err3);
                                        else
                                            res.status(200).send(result3);
                                        if (result.engine)
                                            Contrib.count({engine: result.engine}, function(err4, result4) {
                                                console.log(`Found ${result4} contribs using this engine.`);
                                                if (result4 === 0) {
                                                    console.log("Deleting engine", result.engine);
                                                    Engine.findOneAndRemove(result.engine, function(err5, result5) {
                                                        if (err5) console.error(err5);
                                                    });
                                                }
                                            });
                                    });
                        });
                    } else {
                        res.status(403).send({
                            msg: "User does not belong to feed's owners.",
                            owners: result.owners,
                            user: req.user,
                            truthiness: result.owners.reduce((prev, cur) => prev || cur.username === req.user.username, false)
                        });
                    }
                }
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
                if (result.owners.reduce((prev, cur) => prev || cur.username === req.user.username, false)) {
                    Feed.findOneAndUpdate(
                        {_id: req.params.feedId},
                        req.body,
                        {new: true})
                    .populate('owners')
                    .exec(function (err, result2) {
                            if (err)
                                res.status(500).send(err);
                            res.status(200).send(result2);
                        });
                } else {
                    res.status(403).send({
                        msg: "User does not belong to feed's owners.",
                        owners: result.owners,
                        user: req.user,
                        truthiness: result.owners.reduce((prev, cur) => prev || cur.username === req.user.username, false)
                    });
                }
            }
		});
	});

});
