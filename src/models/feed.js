import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;

var feedSchema = new mongoose.Schema({
	'created': {
		type: Date,
		default: Date.now
	},
	'engineId': Types.ObjectId,
	'title': String,
	'description': {
		type: String,
		required: false
	}
});

export var Feed = mongoose.model('feed', feedSchema);
