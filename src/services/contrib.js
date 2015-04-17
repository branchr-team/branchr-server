import {db} from 'db';
import {pmongo} from 'npm';
var ObjectId = pmongo.ObjectId;

var contribs = db.collection('contribs');

export function getById(id) {
	contribs.findOne({_id: ObjectId(id)}).then(result => {
		return new Promise((resolve, reject) => {
			if (result == null) reject({status: 404, msg: ''});
			else resolve(result);
		});
	});
}
