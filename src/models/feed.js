import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;
import 'models/user';

var feedSchema = new mongoose.Schema({
	'created': {
		type: Date,
		required: false,
        default: Date.now
    },
    'owners': [{
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    }],
	'engine': {
		type: Types.ObjectId,
		required: false,
        default: null,
        ref: 'engine'
	},
	'name': {
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
