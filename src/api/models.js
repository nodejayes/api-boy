const {models} = require('../database/instance');

module.exports.GET = async (req, res, next) => {
    const info = [];
    console.info(models);
    for (const key of Object.keys(models)) {
        info.Add({
            name: models[key].instance.name,
            columns: models[key].instance.rawAttributes,
            associations: models[key].instance.associations,
            meta: models[key].meta,
        });
    }
    next(info);
};
