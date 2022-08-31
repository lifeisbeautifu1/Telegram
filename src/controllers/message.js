"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMessages = exports.sendMessage = void 0;
const http_status_codes_1 = require("http-status-codes");
const db_1 = require("../db/db");
const errors_1 = require("../errors");
const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        throw new errors_1.BadRequestError('Invalid data passsed into request');
    }
    const message = (await (0, db_1.query)('INSERT INTO messages (content, chat, sender) VALUES ($1, $2, $3) RETURNING *;', [content, chatId, res.locals.user.id])).rows[0];
    message.sender = res.locals.user;
    const chat = (await (0, db_1.query)('UPDATE chats SET latest_message = $1 WHERE id = $2 RETURNING *;', [message.id, chatId])).rows[0];
    const users = (await (0, db_1.query)('SELECT id, username, image_url FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])).rows;
    chat.users = users;
    message.chat = chat;
    res.status(http_status_codes_1.StatusCodes.OK).json(message);
};
exports.sendMessage = sendMessage;
const getAllMessages = async (req, res) => {
    const { chatId } = req.params;
    const messages = (await (0, db_1.query)('SELECT * FROM messages WHERE chat = $1 ORDER BY created_at DESC;', [chatId])).rows;
    for (const message of messages) {
        const sender = (await (0, db_1.query)('SELECT id, username, image_url FROM users WHERE id = $1;', [
            message.sender,
        ])).rows[0];
        message.sender = sender;
        const chat = (await (0, db_1.query)('SELECT * FROM chats WHERE id = $1;', [chatId]))
            .rows[0];
        message.chat = chat;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(messages);
};
exports.getAllMessages = getAllMessages;
