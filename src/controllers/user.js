import {bcrypt} from 'npm';
import {Controller} from 'lib/controller';
import {User} from 'models/user';
import {auth} from 'controllers/auth';

export default new Controller((router) => {

	router.get('/:username', (req, res) => {
		User.findOne(req.params.username, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result.toJSON());
		});
	});

	router.get('', auth, (req, res) => {
		User.findOne(req.user._id, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result.toJSON());
		});
	});

	router.post('/:username', (req, res) => {
		req.body.username = req.params.username;
		req.body.passHash = bcrypt.hashSync(req.body.password);
		User.count({username: req.params.username}, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else if (result != 0)
				res.status(400).send({msg: "username already exists"});
			else
				User.create(req.body, function(err, result) {
					if (err) 
						res.status(500).send(err);
					else if (!result)
						res.status(404).send();
					else
						res.status(200).send(result);
				});
		});
	});

	router.put('/:username', auth, (req, res) => {
		if (req.user.username !== req.params.username)
			return res.status(403).send();
		if (req.body.password)
			req.body.passHash = bcrypt.hashSync(req.body.password);
		User.findOneAndUpdate(
			{username: req.params.username}, 
			req.body, 
			{new: true, upsert: true}, 
			function(err, result) {
				if (err) 
					res.status(err.status || 500).send(err);
				else if (!result)
					res.status(404).send();
				else
					res.status(200).send(result);
			});
	});

	router.delete('/:username', (req, res) => {
		User.findOneAndRemove({username: req.params.username}, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else if (!result)
				res.status(404).send();
			else
				res.status(200).send(result);
		});
	});

});
