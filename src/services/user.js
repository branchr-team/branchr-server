import {db} from 'db';

var users = db.collection('users');

export function register(user) {
	return users.insert(user);
}

export function getByName(name) {
	return users.findOne({'name': name});
}
