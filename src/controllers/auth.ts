import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { query } from '../db/db';
import { validateRegisterInput, validateLoginInput } from '../utils/validation';
import { StatusCodes } from 'http-status-codes';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { errors } = validateLoginInput(username, password);

  if (Object.keys(errors).length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });

  const user = (
    await query(
      'SELECT id, username, password, email, image_url, last_online FROM users WHERE username = $1 LIMIT 1;',
      [username]
    )
  ).rows[0];

  if (!user) errors.username = 'User not found!';

  if (Object.keys(errors).length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });

  const match = await bcrypt.compare(password, user.password);

  if (!match) errors.password = 'Password is incorrect';

  if (Object.keys(errors).length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });

  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 3600 * 24 * 7,
    // sameSite: 'strict',
    sameSite: 'none',
    path: '/',
  });

  res.status(StatusCodes.OK).json({
    id: user.id,
    username: user.username,
    email: user.email,
    image_url: user.image_url,
    last_online: user.last_online,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.cookie('token', '', {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: +new Date(0),
    // sameSite: 'strict',
    sameSite: 'none',
    path: '/',
  });
  res.json({ message: 'Logout' });
};

export const register = async (req: Request, res: Response) => {
  let { username, email, password, confirmPassword } = req.body;

  const { errors } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );

  const userWithUsername = await query(
    'SELECT * FROM users WHERE username = $1;',
    [username]
  );

  if (userWithUsername.rows[0])
    errors.username = `User with username ${username} already exist`;

  const userWithEmail = await query('SELECT * FROM users WHERE email = $1;', [
    email,
  ]);

  if (userWithEmail.rows[0])
    errors.email = `User with email ${email} already exist`;

  if (Object.keys(errors).length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json({ errors });

  password = await bcrypt.hash(password, 6);

  const user = await query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, image_url;',
    [username, email, password]
  );

  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 3600 * 24 * 7,
    // sameSite: 'strict',
    sameSite: 'none',
    path: '/',
  });

  res.status(StatusCodes.OK).json(user.rows[0]);
};

export const me = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(res.locals.user);
};
