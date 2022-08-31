import { Pool } from 'pg';

// const devConfig = {
//   user: process.env.PG_USER!,
//   password: process.env.PG_PASSWORD!,
//   host: process.env.PG_HOST!,
//   database: process.env.PG_DATABASE!,
//   port: +process.env.PG_PORT!,
// };

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL;


const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig
}
);

export const query = (text: string, vars: any[]) => pool.query(text, vars);
