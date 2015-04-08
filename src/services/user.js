import {db} from 'db';

var users = db.collection('users');

export function register(user) {
	return new Promise((resolve, reject) => {
		console.log(`Registering user with name ${user.name}`);
		users.count({name: user.name})
			.then((count) => {
				if (count == 0) users.insert(user).then(resolve).catch(reject);
				else reject({code: 400, msg: "User already exists!"});
			})
			.catch(reject);
	})
}

export function getByName(name) {
	console.log(`Finding user by name ${name}`);
	return users.findOne({'name': name}).then((result) => {
		return new Promise((resolve, reject) => {
			if (result == null) reject({status: 404, msg: `Could not find user ${name}!`});
			else resolve(result);
		});
	});
}

export function getAll() {
	return new Promise((resolve, reject) => {
		users.find({}).toArray().then(resolve).catch(reject);
	});
}
