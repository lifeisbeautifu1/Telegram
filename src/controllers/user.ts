import { Request, Response } from 'express';

import { query } from '../db/db';

export const search = async (req: Request, res: Response) => {
  const search: any = req.query.search || '';
  const users = (
    await query(
      'SELECT id, username, image_url FROM users WHERE LOWER(username) LIKE $1 AND username != $2',
      ['%' + search.toLowerCase().trim() + '%', res.locals.user.username]
    )
  ).rows;
  res.status(200).json(users);
};
