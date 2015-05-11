import {Controller} from 'lib/controller';
import {Contrib} from 'models/contrib';
import {User} from 'models/user';
import {Vote} from 'models/vote';
import {auth} from 'controllers/auth';

export default new Controller(router => {

    router.get('/:contribId', (req, res) => {
        let dbQuery = Contrib.findById(req.params.contribId);
        dbQuery.populate('creator', 'username');
        dbQuery.populate('feed', 'name owners');
        dbQuery.exec(function(err, result) {
            if (err)
                res.status(500).send(err);
            else if (!result)
                res.status(404).send();
            else
                User.populate(result, {path: 'feed.owners', select: 'username'}, function(err2, result2) {
                    if (err2)
                        res.status(500).send(err2);
                    else if (!result2)
                        res.status(404).send();
                    else
                        res.status(200).send(result2);
                });
        });
    });

    // DELETE /contrib/:contribId
    router.delete('/:contribId', auth, (req, res) => {
        Contrib.findOne(req.params.contribId, function(err, result) {
            if (err)
                res.status(500).send(err);
            else if (!result)
                res.status(404).send();
            else if (result.creator.toString() === req.user._id.toString())
                Contrib.findOneAndRemove(req.params.contribId, function (err, result) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(200).send(result);
                });
            else
                res.status(403).send({
                    msg: "User is not creator!",
                    creator: result.creator,
                    user: req.user,
                    truthiness: result.creator.toString() === req.user._id.toString()
                });
        });
    });

    // POST /contrib
    router.post('', auth, (req, res) => {
        req.body.userId = req.user._id;
        Contrib.create(req.body, function(err, result) {
            if (err)
                res.status(500).send(err);
            else
                res.status(200).send(result);
        });
    });

    router.post('/:contribId/vote/:vote', auth, (req, res) => {
        Vote.findOneAndUpdate(
            {contrib: req.params.contribId},
            {$set: {contrib: req.params.contribId, user: req.user._id, vote: req.params.vote}},
            {upsert: true}
        )
            .exec(function(err, result) {
                if (err)
                    res.status(500).send(err);
                else {
                    let diff = (result)? req.params.vote - result.vote : req.params.vote;
                    Contrib.findOneAndUpdate(
                        {_id: req.params.contribId},
                        {$inc: {score: diff}},
                        {new: true}
                    )
                        .exec(function(err, result) {
                            if (err)
                                res.status(500).send(err);
                            else
                                res.status(200).send(result);
                        });
                }
        });
    });


    // GET /contrib/?feedId=<id>
    router.get('/', (req, res) => {
        let query = {};
        if (req.query.feedId)
            query.feed = req.query.feedId;
        if (req.query.userId)
            query.creator = req.query.userId;

        let dbQuery = Contrib.find(query);
        dbQuery.populate('creator', 'username');
        dbQuery.populate('feed', 'name owners');
        dbQuery.exec(function(err, result) {
            if (err)
                res.status(500).send(err);
            else
                User.populate(result, {path: 'feed.owners', select: 'username'}, function(err2, result2) {
                    if (err2)
                        res.status(500).send(err2);
                    else if (!result2)
                        res.status(404).send();
                    else
                        res.status(200).send(result2);
                });
        });
    });


});
