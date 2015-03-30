import {db} from 'db';

var users = db.collection('users');

export function register(user) {
	console.log(`Registering user with name ${user.name}`);
	return users.insert(user);
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
