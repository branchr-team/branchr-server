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
        return dbQuery.exec()
            .then(contrib => {
                if (!contrib)
                    return Promise.reject({status: 404, msg: "Contrib not found"});
                return new Promise((resolve, reject) =>
                    User.populate(contrib, {path: 'feed.owners', select: 'username'}, function(err, result) {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    })
                );
            })
            .then(contrib => {
                if (!contrib)
                    return Promise.reject({status: 404, msg: "Contrib not found"});
                return contrib;
            });
    });

    // DELETE /contrib/:contribId
    router.delete('/:contribId', auth, (req, res) =>
        Contrib.findOne(req.params.contribId).exec()
            .then(contrib => {
                if (!contrib)
                    return Promise.reject({status: 404, msg: "Contrib not found"});
                else if (contrib.userId === req.user._id)
                    return Contrib.remove(req.params.contribId).exec();
                else
                    return Promise.reject({status: 403});
            })
    );

    // POST /contrib
    router.post('', auth, (req, res) => {
        req.body.userId = req.user._id;
        return Contrib.create(req.body).exec();
    });

    router.post('/:contribId/vote/:vote', auth, (req, res) => {
        Vote.findOneAndUpdate(
            {contrib: req.params.contribId},
            {$set: {contrib: req.params.contribId, user: req.user._id, vote: req.params.vote}},
            {upsert: true}
        )
            .exec()
            .then(vote => {
                let diff = (vote)? req.params.vote - vote.vote : req.params.vote;
                return Contrib.findOneAndUpdate(
                    {_id: req.params.contribId},
                    {$inc: {score: diff}},
                    {new: true}
                ).exec();
            })
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
        return dbQuery.exec()
            .then(contribs => {
                return new Promise((resolve, reject) =>
                    User.populate(contribs, {path: 'feed.owners', select: 'username'}, function(err, result) {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    })
                );
            })
            .then(contribs => {
                return contribs;
            });
    });


});
