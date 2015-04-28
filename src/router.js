import {express} from 'npm';
import 'db';
import AuthController from 'controllers/auth';
import UserController from 'controllers/user';
import FeedController from 'controllers/feed';
import ContribController from 'controllers/contrib';
import EngineController from 'controllers/engine';

export default function router() {
	var router = express.Router();

	router.use('', AuthController.router);
	router.use('/user', UserController.router);
	router.use('/feed', FeedController.router);
	router.use('/contrib', ContribController.router);
	router.use('/engine', EngineController.router);

	return router;
}
