import {db} from 'db';

var users = db.collection('users');

export function register(user) {
	return new Promise((resolve, reject) => {
		console.log(`Registering user with name ${user.username}`);
		users.count({username: user.username})
			.then((count) => {
				if (count == 0) users.insert(user).then(resolve).catch(reject);
				else reject({code: 400, msg: "User with that username already exists!"});
			})
			.catch(reject);
	})
}

export function unregisterByName(username) {
	return new Promise((resolve, reject) => {
		console.log(`Unregistering user with name ${username}`);
		users.remove({username: username})
			.then(result => resolve(result))
			.catch(err => reject(err));
	})
}

export function getByName(username) {
	console.log(`Finding user by name ${username}`);
	return users.findOne({username: username}).then((result) => {
		return new Promise((resolve, reject) => {
			if (result == null) reject({status: 404, msg: `Could not find user ${username}!`});
			else resolve(result);
		});
	});
}

export function getAll() {
	return new Promise((resolve, reject) => {
		users.find({}).toArray().then(resolve).catch(reject);
	});
}
