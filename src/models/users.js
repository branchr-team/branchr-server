import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;

var usersSchema = new mongoose.Schema({
        'created': {
                type: Date,
                default: Date.now,
                required: false
        },
	'username': {
		type: Types.ObjectId,
		required: true
	}
});

export var Users = mongoose.model('users', usersSchema);

