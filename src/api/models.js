const {models} = require('../database/instance');

module.exports.GET = async (req, res, next) => {
    const info = [];
    console.info(models);
    for (const key of Object.keys(models)) {
        info.Add({
            name: models[key].name,
            columns: models[key].rawAttributes,
            associations: models[key].associations,
        });
    }
    next(info);
};
