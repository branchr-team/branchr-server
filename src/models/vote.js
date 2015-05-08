import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;
import 'models/user';
import 'models/contrib';

var voteSchema = new mongoose.Schema({
    'user': {
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    'contrib': {
        type: Types.ObjectId,
        required: true,
        ref: 'contrib'
    },
    'vote': {
        type: Number,
        required: true,
        validator(v) {
            return v == -1 || v == 1 || v == 0;
        }
    }
});

export var Vote = mongoose.model('vote', voteSchema);
