import * as config from 'config';
var pmongo = require('promised-mongo');
export var db = require('promised-mongo')(config.DB_URI);
