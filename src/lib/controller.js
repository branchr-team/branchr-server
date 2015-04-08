import {express} from 'npm';
export class Controller {
	constructor(registerationFunction) {
		this.router = express.Router();
		registerationFunction(this.router);
	}
}
