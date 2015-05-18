export var express = require('express');
export var bodyParser = require('body-parser');
export var bcrypt = require('bcrypt-nodejs');
export var methods = require('methods');

var mongoose = require('mongoose');
mongoose.Query.prototype.exec = function(op, callback) {
	var _this = this;
	if (typeof op == 'function') {
		callback = op;
		op = null;
	} else if (typeof op == 'string') {
		this.op = op;
	}
	if (!this.op) {
		return Promise.resolve();
	}
	var promise = new Promise((resolve, reject) => {
		this[this.op].call(this, function(err, result) {
			if (err) reject(err);
			else resolve(result);
		});
	});
	if (callback) 
		return promise
			.then(res => callback(null, res))
			.catch(err => callback(err, null));
	else return promise;
};
export {mongoose};
