import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

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

export const updateUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  const user = (
    await query('SELECT * FROM users WHERE username = $1;', [username])
  ).rows[0];
  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        username: 'Username already taken',
      },
    });
  } else {
    const updatedUser = (
      await query('UPDATE users SET username = $1 WHERE id = $2 RETURNING *;', [
        username,
        res.locals.user.id,
      ])
    ).rows[0];

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 7,
      sameSite: 'strict',
      // sameSite: 'none',
      path: '/',
    });
    return res.status(StatusCodes.OK).json(updatedUser);
  }
};

export const updateImage = async (req: Request, res: Response) => {
  const { image_url } = req.body;
  const updatedUser = (
    await query('UPDATE users SET image_url = $1 WHERE id = $2 RETURNING *;', [
      image_url,
      res.locals.user.id,
    ])
  ).rows[0];

  return res.status(StatusCodes.OK).json(updatedUser);
};
