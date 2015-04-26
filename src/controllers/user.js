import {Controller} from 'lib/controller';
import {Users} from 'models/users';

export default new Controller(router => {

        router.get('/:username', (req, res) => {
                Users.findById(req.params.username, function(err, result) {
                        if (err)
                                res.status(err.status || 500).send(err);
                        else if (!result)
                                res.status(404).send();
                        else
                                res.status(200).send(result);
                });
        });

        router.delete('/:username', (req, res) => {
                Users.findByIdAndRemove(req.params.username, function(err, result) {
                        if (err)
                                res.status(err.status || 500).send(err);
                        else if (!result)
                                res.status(404).send();
                        else
                                res.status(200).send(result);
                });
        });
	
	 router.post('', (req, res) => {
                Users.create({
                        username: req.body.username
                }, function(err, result) {
                        if (err)
                                res.status(err.status || 500).send(err);
                        else
                                res.status(200).send(result);
                });
        });

        router.get('/', (req, res) => {
                let query = {};
                if (req.query.username)
                        query.username = req.query.username;
                Users.find(query, function(err, result) {
                        if (err)
                                res.status(err.status || 500).send(err);
                        else
                                res.status(200).send(result);
                });
        });

});


