const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const MODELS = {};
const INSTANCE = {
    namespace: Sequelize,
    instance: null,
    models: MODELS,
    connect: connect,
    sync: reloadModels,
};

function readModelDefinitions(folder) {
    const entries = fs.readdirSync(folder);
    for (const entry of entries) {
        const fullpath = path.join(folder, entry);
        const stats = fs.statSync(fullpath);
        if (stats.isDirectory()) {
            readModelDefinitions(fullpath);
            continue;
        }
        if (fullpath.EndsWith('.model.js')) {
            const filename = entry.Split('.model.js').LastOrDefault();
            const fn = require(fullpath);
            MODELS[filename] = {
                instance: INSTANCE.instance.import(filename, fn.def),
                meta: fn.meta,
            };
        }
    }
}

function reloadModels() {
    readModelDefinitions(path.join(__dirname, '..', 'models'));
    return syncModels();
}

function syncModels() {
    return INSTANCE.instance.sync();
}

function connect(opts) {
    INSTANCE.instance = new Sequelize(opts.dbname || 'postgres', opts.user || 'postgres', opts.password || 'postgres', {
        host: opts.host || 'localhost',
        port: opts.port || 5432,
        dialect: 'postgres',
        pool: {
            max: opts.pool_max || 5,
            min: opts.pool_min || 0,
            acquire: opts.pool_acquire || 30000,
            idle: opts.pool_idle || 10000,
        }
    });
    reloadModels();
}

module.exports = INSTANCE;
