import {mongoose} from 'npm';

var engineSchema = new mongoose.Schema({
	'created': {
		type: Date,
		default: Date.now,
		required: false
	},
	'js': {
		type: String,
		required: true
	},
	'html': {
		type: String,
		required: true
	},
	'css': {
		type: String,
		required: true
	},
	'fields': [{
		'key': {
			type: String,
			required: true
		},
		'type': {
			type: Number,
			required: true
		},
		'default': {
			type: String,
			required: false
		}
	}]
});

export var Engine = mongoose.model('engine', engineSchema);
