import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { query } from '../db/db';
import { BadRequestError } from '../errors';

export const accessChat = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId)
    throw new BadRequestError('userId params not sent with request!');
  // Try to find chat first

  let chat = (
    await query(
      'SELECT id, COUNT(*) ,chat_name, is_group_chat, created_at, latest_message FROM chats INNER JOIN (SELECT * FROM chat_user WHERE user_id IN ($1, $2)) chat_user ON chats.id = chat_user.chat_id WHERE chats.is_group_chat = false GROUP BY id ORDER BY COUNT(*) DESC LIMIT 1;',
      [res.locals.user.id, userId]
    )
  ).rows[0];

  if (chat) {
    if (Number(chat?.count) !== 2) {
      // Create Chat if not exist
      chat = (
        await query('INSERT INTO chats (chat_name) VALUES ($1) RETURNING *;', [
          'sender',
        ])
      ).rows[0];
      await query(
        'INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2), ($3, $4);',
        [chat.id, res.locals.user.id, chat.id, userId]
      );
    }
  } else {
    // Create Chat if not exist
    chat = (
      await query('INSERT INTO chats (chat_name) VALUES ($1) RETURNING *;', [
        'sender',
      ])
    ).rows[0];
    await query(
      'INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2), ($3, $4);',
      [chat.id, res.locals.user.id, chat.id, userId]
    );
  }
  const users = (
    await query('SELECT username, image_url FROM users WHERE id IN ($1, $2);', [
      res.locals.user.id,
      userId,
    ])
  ).rows;
  chat.users = users;
  res.status(StatusCodes.OK).json(chat);
};
export const fetchChats = async (req: Request, res: Response) => {
  res.send('fetch chats');
};
export const createGroupChat = async (req: Request, res: Response) => {
  res.send('create group chat');
};
export const removeFromGroupChat = async (req: Request, res: Response) => {
  res.send('remove from grup chat');
};
export const addToGroupChat = async (req: Request, res: Response) => {
  res.send('add to group chat');
};
export const renameGroupChat = async (req: Request, res: Response) => {
  res.send('rename group chat');
};
