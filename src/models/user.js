import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;

var userSchema = new mongoose.Schema({
	'created': {
		type: Date,
		required: false,
		default: Date.now
	},
	'email': {
		type: String,
		required: false
	},
	'username': {
		type: String,
		required: true
	},
	'passHash': {
		type: String,
		required: true
	},
	'token': {
		type: String,
		required: false
	},
	'settings': {
		type: Types.Mixed,
		default: {}
	}
});

userSchema.method('toJSON', function() {
	var user = this.toObject();
	delete user.passHash;
	delete user.token;
	return user;
});

export var User = mongoose.model('user', userSchema);
