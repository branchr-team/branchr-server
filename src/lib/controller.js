import {express, methods} from 'npm';

function promisedRoute(func) {
	return function(req, res) {
		let result = func(req, res);
		if (result || result.constructor || result.constructor.name == 'Promise')
			result
				.then(result => {
                    res.status(200).send(result)
                })
				.catch(err => {
                    console.error(err);
                    res.status(err.status || 500).send(err)
                });
		else
			return result;
	};
}

export class Controller {
	constructor(registrationFunction) {
		this.router = express.Router();
		let custRouter = {};
		methods.forEach(method => {
			custRouter[method] = (...args) => {
				return this.router[method](
                    args[0],
                    ...args.slice(1, args.length-1),
                    promisedRoute(args[args.length-1])
                );
			};
		});
		registrationFunction(custRouter);
	}
}
