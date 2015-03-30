var pmongo = require('promised-mongo');
export var db = require('promised-mongo')(process.env['MONGOLAB_URI']);
