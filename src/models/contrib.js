import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;

var contribSchema = new mongoose.Schema({
	'created': {
		type: Date,
		default: Date.now,
		required: false
	},
	'engineId': {
		type: Types.ObjectId,
		required: true
	},
	'feedId': {
		type: Types.ObjectId,
		required: true
	},
	'params': {
		type: Types.Mixed,
		required: true
	}
});

export var Contrib = mongoose.model('contrib', contribSchema);
