import {mongoose} from 'npm';
var Types = mongoose.Schema.Types;

var userSchema = new mongoose.Schema({
	'created': {
		type: Date,
		required: false,
		default: Date.now
	},
	'username': {
		type: String,
		required: true
	},
	'passHash': {
		type: String,
		required: true
	},
	'fname': {
		type: String,
		required: false
	},
	'lname': {
		type: String,
		required: false
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
