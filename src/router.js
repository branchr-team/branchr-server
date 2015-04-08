import {express} from 'npm';
import UserController from 'controllers/user';

export default function router() {
	var router = express.Router();

	router.get('/', (req, res) => {
		res.send({msg: 'Hullo'});
	});
	router.use('/user', UserController.router);

	return router;
}
