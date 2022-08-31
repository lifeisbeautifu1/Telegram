"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
// const devConfig = {
//   user: process.env.PG_USER!,
//   password: process.env.PG_PASSWORD!,
//   host: process.env.PG_HOST!,
//   database: process.env.PG_DATABASE!,
//   port: +process.env.PG_PORT!,
// };
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL;
const pool = new pg_1.Pool({
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig,
    ssl: {
        rejectUnauthorized: false,
    },
});
const query = (text, vars) => pool.query(text, vars);
exports.query = query;
