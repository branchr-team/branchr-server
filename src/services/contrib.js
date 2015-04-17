import {db} from 'db';
import {pmongo} from 'npm';
var ObjectId = pmongo.ObjectId;

var contribs = db.collection('contribs');

export function getById(id) {
	return contribs.findOne({_id: ObjectId(id)})
	.then(result => new Promise((resolve, reject) => {
		if (!result) resolve(null);
		db.collection('engines').findOne({id: result.engine})
			.then(engineResult => {
				result.js = engineResult.js;
				resolve(result);
			})
			.catch(reject);
	}))
	.then(result => {
		return new Promise((resolve, reject) => {
			if (result == null) reject({status: 404, msg: ''});
			else resolve(result);
		});
	});
}
