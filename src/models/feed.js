import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;

var feedSchema = new mongoose.Schema({
	'created': {
		type: Date,
		required: false,
		default: Date.now
	},
	'permissions': {
		type: {
			'owners': {
				type: [Types.ObjectId],
				required: true
			}
			//'editors': {
				//type: [String]
			//},
			//'moderators': {
				//type: [String]
			//}
		},
		required: true
	},
	'engineId': {
		type: Types.ObjectId,
		required: true
	},
	'title': {
		type: String,
		required: true
	},
	'description': {
		type: String,
		required: false
	},
	'tags': {
		type: [String],
		required: false,
		default: []
	},
	'citations': {
		type: [{
			'href': {
				type: String,
				required: false
			},
			'name': {
				type: String,
				required: true
			}
		}],
		required: false,
		default: []
	}
});

export var Feed = mongoose.model('feed', feedSchema);
