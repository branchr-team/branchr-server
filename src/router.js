import {express} from 'npm';
import UserController from 'controllers/user';
import FeedController from 'controllers/feed';
import ContribController from 'controllers/contrib';

export default function router() {
	var router = express.Router();

	router.get('/', (req, res) => {
		res.send({msg: 'Hullo'});
	});
	router.use('/user', UserController.router);
	router.use('/feed', FeedController.router);
	router.use('/contrib', ContribController.router);

	return router;
}
