import {bcrypt} from 'npm';
import {Controller} from 'lib/controller';
import {User} from 'models/user';

export function auth(req, res, next) {
	User.findOne({
		username:   req.get('X-Username'),
		token:      req.get('X-Token')
	}).exec()
		.then(result => {
			if (!result)
				res.status(401).send();
			else {
				req.user = result.toObject();
				next();
			}
		})
		.catch(err => {
			res.status(500).send(err);
		});
}

export default new Controller((router) => {

	router.post('/login', (req, res) =>
		User.findOne({username: req.body.username}).exec()
			.then(user => {
				if (!user)
					return Promise.reject({status: 404, msg: "User not found"});
				return new Promise((resolve, reject) => {
					bcrypt.compare(
						req.body.password, 
						user.passHash, 
						(err, match) => {
							if (err) 
								reject(err);
							else if (match)
								resolve([user, match]);
							else 
								reject({status: 400, msg: "Password did not match"});
						})
				});
			})
			.then(([user, match]) => {
				return new Promise((resolve, reject) => {
					bcrypt.hash(
						user.username+user.passHash+Date.now(), 
						null, null,
						(err, hash) => {
							if (err)
								reject(err);
							else
								resolve(hash);
						}
					);
				});
			})
			.then(hash => {
				return User.findOneAndUpdate(
					{username: req.body.username}, 
					{token: hash}, 
					{new: true}).exec();
			})
			.then(result => {
				if (!result)
					return Promise.reject({status: 404, msg: "User not found"});
				else
					return Promise.resolve({
						user: result,
						token: result.token
					});
			})
		);

		router.post('/logout', (req, res) =>
			User.findOne({username: req.body.username}).exec()
			.then(user => {
				if (!user)
					return Promise.reject({status: 404, msg: "User not found"});
				return User.findOneAndUpdate(
					{username: req.body.username}, 
					{token: null},
					{new: true}).exec();
			})
		);

});
