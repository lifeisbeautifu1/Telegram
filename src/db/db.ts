import { Pool } from 'pg';

const pool = new Pool();

export const query = (text: string, vars: any[]) => pool.query(text, vars);
