import {Controller} from 'lib/controller';
import {Feed} from 'models/feed';
import {Engine} from 'models/engine';
import {Contrib} from 'models/contrib';
import {auth} from 'controllers/auth';
export default new Controller(router => {

    router.get('/:feedId', (req, res) =>
            Feed.findById(req.params.feedId)
                .populate('owners', 'username')
                .exec()
    );

    router.get('/', (req, res) =>
            Feed.find({})
                .populate('owners')
                .exec()
    );

	// Make a new Feed
	router.post('', auth, (req, res) => {
		if (!req.body.owners)
            req.body.owners = [req.user._id];
		return Feed.create(req.body).exec();
	});

    router.put('/:feedId/engine', auth, (req, res) =>
        Feed.findOne(req.params.feedId)
            .populate('owners')
            .exec()
            .then(feed => {
                if (!feed)
                    return Promise.reject({status: 404, msg: "User not found"});
                if (feed.owners.map(o => o._id.toString()).indexOf(req.user._id.toString()) !== -1)
                    return Engine.create(req.body).exec();
                else
                    return Promise.reject({status: 403, msg: "User does not belong to feed's owners."})
            })
            .then(engine => {
                if (!engine)
                    return Promise.reject({status: 404});
                return Feed.findOneAndUpdate(
                    {_id: req.params.feedId},
                    {$set: {engine: engine._id}},
                    {new: true}
                );
            })
            //.then(updatedFeed => {
            //    if (result.engine)
            //        Contrib.count({engine: result.engine}, function(err4, result4) {
            //            console.log(`Found ${result4} contribs using this engine.`);
            //            if (result4 === 0) {
            //                console.log("Deleting engine", result.engine);
            //                Engine.findOneAndRemove(result.engine, function(err5, result5) {
            //                    if (err5) console.error(err5);
            //                });
            //            }
            //        });
            //})
    );

	// Update an existing Feed
    router.put('/:feedId', auth, (req, res) =>
            Feed.findOne(req.params.feedId)
                .populate('owners')
                .exec()
                .then(feed => {
                    if (!feed)
                        return Promise.reject({status: 404, msg: "User not found"});
                    else if (feed.owners.map(o => o._id.toString()).indexOf(req.user._id.toString()) !== -1)
                        return Feed.findOneAndUpdate(
                            {_id: req.params.feedId},
                            req.body,
                            {new: true}
                        ).exec();
                    else
                        return Promise.reject({status: 403, msg: "User does not belong to feed's owners."})
                })
    );

});
