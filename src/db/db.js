"use strict";
exports.__esModule = true;
exports.query = void 0;
var pg_1 = require("pg");
// const devConfig = {
//   user: process.env.PG_USER!,
//   password: process.env.PG_PASSWORD!,
//   host: process.env.PG_HOST!,
//   database: process.env.PG_DATABASE!,
//   port: +process.env.PG_PORT!,
// };
var devConfig = "postgresql://".concat(process.env.PG_USER, ":").concat(process.env.PG_PASSWORD, "@").concat(process.env.PG_HOST, ":").concat(process.env.PG_PORT, "/").concat(process.env.PG_DATABASE);
var proConfig = process.env.DATABASE_URL;
var pool = new pg_1.Pool({
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig,
    ssl: {
        rejectUnauthorized: false
    }
});
var query = function (text, vars) { return pool.query(text, vars); };
exports.query = query;
