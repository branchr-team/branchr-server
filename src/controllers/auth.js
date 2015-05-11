import {bcrypt} from 'npm';
import {Controller} from 'lib/controller';
import {User} from 'models/user';

export function auth(req, res, next) {
	User.findOne({
		username:   req.get('X-Username'),
		token:      req.get('X-Token')
	}, function(err, result) {
		if (err) 
			res.status(500).send(err);
		else if (!result)
			res.status(401).send();
		else {
			req.user = result.toObject();
			next();
		}
	});
}

export default new Controller((router) => {

	router.post('/login', (req, res) => {
		User.findOne({username: req.body.username}, function(err, result) {
			if (err)
				res.status(500).send(err);
			else if (!result)
				res.status(404).send();
			else
				bcrypt.compare(req.body.password, result.passHash, (err, match) => {
					if (err) 
						res.status(500).send(err);
					else if (match)
						bcrypt.hash(
							result.username+result.passHash+Date.now(), 
						null, null,
						(err, hash) => User.findOneAndUpdate(
							{username: req.body.username}, 
							{token: hash}, 
							{new: true}, 
							function(err, result2) {
								if (err) 
									res.status(500).send(err);
								else if (!result2)
									res.status(404).send();
								else
									res.status(200).send({
										user: result2,
										token: result2.token
									});
							})
						);
				   else 
					   res.status(401).send({msg: 'password did not match'});
				})
		});
	});

	router.post('/logout', (req, res) => {
		User.findOne({username: req.body.username}, function(err, result) {
			if (err) 
				res.status(500).send(err);
			else if (!result)
				res.status(404).send();
			else 
				User.findOneAndUpdate(
					{username: req.body.username}, 
					{token: null}, 
					{new: true}, 
					function(err, result2) {
						if (err) 
							res.status(500).send(err);
						else if (!result2)
							res.status(404).send();
						else
							res.status(200).send(result2);
					}
				);
		});
	});

});
