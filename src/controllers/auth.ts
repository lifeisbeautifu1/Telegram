import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { query } from '../db/db';
import { validateRegisterInput, validateLoginInput } from '../utils/validation';
import { StatusCodes } from 'http-status-codes';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { errors } = validateLoginInput(username, password);
  if (Object.keys(errors).length > 0) throw errors;

  const user = await query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  if (!user.rows[0]) {
    errors.username = 'User not found!';
  }
  if (Object.keys(errors).length > 0) throw errors;

  const match = await bcrypt.compare(password, user.rows[0].password);

  if (!match) {
    errors.password = 'Password is incorrect';
  }
  if (Object.keys(errors).length > 0) throw errors;

  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
    maxAge: 3600,
    sameSite: 'none',
    path: '/',
  });

  res.status(StatusCodes.OK).json(user.rows[0]);
};

export const logout = async (req: Request, res: Response) => {
  res.cookie('token', '', {
    secure: true,
    httpOnly: true,
    maxAge: +new Date(0),
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

  if (userWithUsername.rows[0]) {
    errors.username = `User with username ${username} already exist`;
  }

  const userWithEmail = await query('SELECT * FROM users WHERE email = $1;', [
    email,
  ]);

  if (userWithEmail.rows[0]) {
    errors.email = `User with email ${email} already exist`;
  }

  if (Object.keys(errors).length > 0) {
    throw errors;
  }

  password = await bcrypt.hash(password, 6);

  const user = await query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
    [username, email, password]
  );

  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.cookie('token', token, {
    secure: true,
    httpOnly: true,
    maxAge: 3600,
    sameSite: 'none',
    path: '/',
  });

  res.status(StatusCodes.OK).json(user.rows[0]);
};

export const me = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json(res.locals.user);
};
