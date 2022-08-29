import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { query } from '../db/db';
import { BadRequestError, NotFoundError } from '../errors';

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
    } else {
      if (chat.latest_message) {
        const message = (
          await query('SELECT * FROM messages WHERE id = $1;', [
            chat.latest_message,
          ])
        ).rows[0];
        const sender = (
          await query(
            'SELECT id, username, image_url FROM users WHERE id = $1;',
            [message.sender]
          )
        ).rows[0];
        message.sender = sender;
        chat.latest_message = message;
      }
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
    await query(
      'SELECT id, username, image_url FROM users WHERE id IN ($1, $2);',
      [res.locals.user.id, userId]
    )
  ).rows;
  chat.users = users;
  res.status(StatusCodes.OK).json(chat);
};
export const fetchChats = async (req: Request, res: Response) => {
  let chats = (
    await query(
      'SELECT id, chat_name, is_group_chat, group_admin, latest_message FROM chats INNER JOIN (SELECT * FROM chat_user WHERE user_id = $1) chat_user ON chats.id = chat_user.chat_id',
      [res.locals.user.id]
    )
  ).rows;

  for (const chat of chats) {
    const users = (
      await query(
        'SELECT id, username, image_url FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;',
        [chat.id]
      )
    ).rows;
    chat.users = users;
    if (chat.group_admin) {
      const groupAdmin = (
        await query(
          'SELECT id, username, image_url FROM users WHERE id = $1;',
          [chat.group_admin]
        )
      ).rows[0];
      chat.group_admin = groupAdmin;
    }
    if (chat.latest_message) {
      const message = (
        await query('SELECT * FROM messages WHERE id = $1;', [
          chat.latest_message,
        ])
      ).rows[0];
      const sender = (
        await query(
          'SELECT id, username, image_url FROM users WHERE id = $1;',
          [message.sender]
        )
      ).rows[0];
      message.sender = sender;
      chat.latest_message = message;
    }
  }

  res.status(StatusCodes.OK).json(chats);
};

export const createGroupChat = async (req: Request, res: Response) => {
  if (!req.body.users || !req.body.name) {
    throw new BadRequestError('Please fill all the fields!');
  }

  const users = JSON.parse(req.body.users);

  users.push(res.locals.user.id);

  if (users.length < 2) {
    throw new BadRequestError(
      'More than 2 users required to form a group chat'
    );
  }

  const groupChat = (
    await query(
      'INSERT INTO chats (chat_name, is_group_chat, group_admin) VALUES ($1, $2, $3) RETURNING *;',
      [req.body.name, true, res.locals.user.id]
    )
  ).rows[0];

  groupChat.group_admin = res.locals.user;

  const groupUsers = [];
  for (const user of users) {
    await query('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2)', [
      groupChat.id,
      user,
    ]);
    const fullUser = (
      await query('SELECT id, username, image_url FROM users WHERE id = $1;', [
        user,
      ])
    ).rows[0];
    groupUsers.push(fullUser);
  }
  groupChat.users = groupUsers;
  res.status(StatusCodes.OK).json(groupChat);
};
export const removeFromGroupChat = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  const removed = (
    await query(
      'DELETE FROM chat_user WHERE chat_id = $1 AND user_id = $2 RETURNING *;',
      [chatId, userId]
    )
  ).rows[0];

  if (!removed) {
    throw new NotFoundError(
      'User with id ' + userId + ' in chat with id ' + chatId + ' not found!'
    );
  } else {
    const chat = (
      await query(
        'SELECT id, chat_name, is_group_chat, group_admin FROM chats WHERE id = $1;',
        [chatId]
      )
    ).rows[0];
    const groupAdmin = (
      await query('SELECT id, username, image_url FROM users WHERE id = $1;', [
        chat.group_admin,
      ])
    ).rows[0];
    chat.group_admin = groupAdmin;
    const users = (
      await query(
        'SELECT id, username, image_url FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;',
        [chat.id]
      )
    ).rows;
    chat.users = users;
    // console.log(chat);
    // console.log(userId);
    if (chat.group_admin.id === userId) {
      if (users.length > 0) {
        chat.group_admin = users[0];
        // console.log(users[0]);
        const newChat = (
          await query('UPDATE chats SET group_admin = $1 WHERE id = $2;', [
            users[0].id,
            chatId,
          ])
        ).rows[0];
        // console.log(newChat);
      }
    }
    res.status(StatusCodes.OK).json(chat);
  }
};

export const addToGroupChat = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  await query('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2);', [
    chatId,
    userId,
  ]);

  const chat = (
    await query(
      'SELECT id, chat_name, is_group_chat, group_admin FROM chats WHERE id = $1;',
      [chatId]
    )
  ).rows[0];

  const groupAdmin = (
    await query('SELECT id, username, image_url FROM users WHERE id = $1;', [
      chat.group_admin,
    ])
  ).rows[0];

  chat.group_admin = groupAdmin;

  const users = (
    await query(
      'SELECT id, username, image_url FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;',
      [chat.id]
    )
  ).rows;
  chat.users = users;
  res.status(StatusCodes.OK).json(chat);
};

export const renameGroupChat = async (req: Request, res: Response) => {
  const { chatId, chatName } = req.body;

  const chat = (
    await query('UPDATE chats SET chat_name = $1 WHERE id = $2 RETURNING *', [
      chatName,
      chatId,
    ])
  ).rows[0];

  if (!chat) {
    throw new NotFoundError(`Chat with id ${chatId} not found!`);
  } else {
    const groupAdmin = (
      await query('SELECT id, username, image_url FROM users WHERE id = $1;', [
        chat.group_admin,
      ])
    ).rows[0];

    chat.group_admin = groupAdmin;

    const users = (
      await query(
        'SELECT id, username, image_url FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;',
        [chat.id]
      )
    ).rows;
    chat.users = users;
    res.status(StatusCodes.OK).json(chat);
  }
};
