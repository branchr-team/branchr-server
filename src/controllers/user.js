import {bcrypt} from 'npm';
import {Controller} from 'lib/controller';
import {User} from 'models/user';
import {auth} from 'controllers/auth';

export default new Controller((router) => {

	router.get('/:username', (req, res) =>
		User.findOne(req.params.username).exec()
			.then(user => {
				if (!user)
					return Promise.reject({status: 404, msg: "User not found"});
				return Promise.resolve(user.toJSON());
			})
	);

	router.get('', auth, (req, res) =>
		User.findOne(req.user._id).exec()
			.then(user => {
				if (!user)
					return Promise.reject({status: 404, msg: "User not found"});
				return Promise.resolve(user.toJSON());
			})
	);

	router.post('/:username', (req, res) => {
		req.body.username = req.params.username;
		req.body.passHash = bcrypt.hashSync(req.body.password);
		return User.count({username: req.params.username}).exec()
			.then(result => {
				if (result != 0)
					return Promise.reject({status: 400, msg: "Username already exists"});
				return User.create(req.body).exec();
			})
			.then(user => {
				if (!user)
					return Promise.reject({status: 404, msg: "User not found"});
				return Promise.resolve(user.toJSON());
			});
	});

	router.put('/:username', auth, (req, res) => {
		if (req.user.username !== req.params.username)
			return Promise.reject({status: 403});
		if (req.body.password)
			return new Promise(
				(resolve, reject) => 
				bcrypt.hash(req.body.password, null, null, function(err, hash) {
					if (err)
						reject(err);
					else
						resolve(hash);
				})
			)
			.then(hash => {
				req.body.passHash = hash;
				return User.findOneAndUpdate(
					{username: req.params.username}, 
					req.body, 
					{new: true, upsert: true}
				);
			})
			.then(user => {
				if (!user)
					return Promise.reject({status: 404, msg: "User not found"});
				return Promise.resolve(user.toJSON());
			});
        else
            return Promise.reject({status: 400, msg: "Password is required"})
	});

	router.delete('/:username', (req, res) =>
		User.findOneAndRemove({username: req.params.username}).exec()
	);

});
