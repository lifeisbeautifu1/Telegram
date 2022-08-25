import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { query } from '../db/db';
import { BadRequestError } from '../errors';

export const sendMessage = async (req: Request, res: Response) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    throw new BadRequestError('Invalid data passsed into request');
  }

  const message = (
    await query(
      'INSERT INTO messages (content, chat, sender) VALUES ($1, $2, $3) RETURNING *;',
      [content, chatId, res.locals.user.id]
    )
  ).rows[0];

  message.sender = res.locals.user;

  const chat = (
    await query(
      'UPDATE chats SET latest_message = $1 WHERE id = $2 RETURNING *;',
      [message.id, chatId]
    )
  ).rows[0];

  const users = (
    await query(
      'SELECT id, username, image_url FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;',
      [chat.id]
    )
  ).rows;
  chat.users = users;

  message.chat = chat;

  res.status(StatusCodes.OK).json(message);
};

export const getAllMessages = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const messages = (
    await query(
      'SELECT * FROM messages WHERE chat = $1 ORDER BY created_at DESC;',
      [chatId]
    )
  ).rows;
  for (const message of messages) {
    const sender = (
      await query('SELECT id, username, image_url FROM users WHERE id = $1;', [
        message.sender,
      ])
    ).rows[0];
    message.sender = sender;
    const chat = (await query('SELECT * FROM chats WHERE id = $1;', [chatId]))
      .rows[0];
    message.chat = chat;
  }
  res.status(StatusCodes.OK).json(messages);
};
