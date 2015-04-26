import {express} from 'npm';
import 'db';
import FeedController from 'controllers/feed';
import ContribController from 'controllers/contrib';
import EngineController from 'controllers/engine';
import UsersController from 'controllers/user';

export default function router() {
	var router = express.Router();

	//router.get('/', (req, res) => {
		//res.send({msg: 'Hullo'});
	//});
	router.use('/feed', FeedController.router);
	router.use('/contrib', ContribController.router);
	router.use('/engine', EngineController.router);
	router.use('/user', UsersController.router);

	return router;
}
