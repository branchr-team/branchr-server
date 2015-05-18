import {Controller} from 'lib/controller';
import {Engine} from 'models/engine';

export default new Controller(router => {

    router.get('/:engineId', (req, res) =>
        Engine.findById(req.params.engineId).exec()
            .then(engine => {
                if (!engine)
                    return Promise.reject({status: 404, msg: "User not found"});
                return engine;
            })
    );

});
