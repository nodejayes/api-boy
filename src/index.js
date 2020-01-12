const acts = require('acts');
const db = require('./database/instance');
const tst = require('ts-tooling');

// creates the Server Instance and run it
module.exports = (opts) => {
    db.connect({
        dbname: opts.store.dbname,
        user: opts.store.user,
        password: opts.store.password,
        host: opts.store.host,
        port: opts.store.port,
        pool_min: opts.store.pool_min,
        pool_max: opts.store.pool_max,
        pool_acquire: opts.store.pool_acquire,
        pool_idle: opts.store.pool_idle,
    });
    acts.createServer(__dirname, opts.endpoint, [])
        .start(async () => {
            console.info(`server running at http://${opts.endpoint.server.address}:${opts.endpoint.server.port}`);
            console.info(db.models);
        });
};
