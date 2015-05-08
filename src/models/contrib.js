import {mongoose} from 'npm';
import 'models/user';
import 'models/feed';
import 'models/engine';
var Types = mongoose.Schema.Types;

var contribSchema = new mongoose.Schema({
    'created': {
        type: Date,
        default: Date.now,
        required: false
    },
    'creator': {
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    'engine': {
        type: Types.ObjectId,
        required: true,
        ref: 'engine'
    },
    'feed': {
        type: Types.ObjectId,
        required: true,
        ref: 'feed'
    },
    'title': {
        type: String,
        required: true
    },
    'params': {
        type: Types.Mixed,
        required: true
    },
    'tags': {
        type: [String],
        required: false,
        default: []
    },
    'score': {
        type: Number,
        required: true,
        default: 0
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

export var Contrib = mongoose.model('contrib', contribSchema);
