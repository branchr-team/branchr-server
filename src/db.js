import {mongoose} from 'npm';
import * as config from 'config';

export var db = mongoose.connect(config.DB_URI).connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.on('open', function() {
	console.log('db connection successful');
})
