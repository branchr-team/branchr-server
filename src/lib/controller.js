export class Controller {
	constructor(registerationFunction) {
		this.router = require('express').Router();
		registerationFunction(this.router);
	}
}
