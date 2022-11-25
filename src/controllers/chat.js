"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroupChatImage = exports.renameGroupChat = exports.addToGroupChat = exports.removeFromGroupChat = exports.createGroupChat = exports.fetchChats = exports.accessChat = void 0;
const http_status_codes_1 = require("http-status-codes");
const db_1 = require("../db/db");
const errors_1 = require("../errors");
const accessChat = async (req, res) => {
    const { userId } = req.body;
    if (!userId)
        throw new errors_1.BadRequestError('userId params not sent with request!');
    // Try to find chat first
    let chat = (await (0, db_1.query)('SELECT id, COUNT(*) ,chat_name, is_group_chat, created_at, image_url, latest_message FROM chats INNER JOIN (SELECT * FROM chat_user WHERE user_id IN ($1, $2)) chat_user ON chats.id = chat_user.chat_id WHERE chats.is_group_chat = false GROUP BY id ORDER BY COUNT(*) DESC LIMIT 1;', [res.locals.user.id, userId])).rows[0];
    if (chat) {
        if (Number(chat === null || chat === void 0 ? void 0 : chat.count) !== 2) {
            // Create Chat if not exist
            chat = (await (0, db_1.query)('INSERT INTO chats (chat_name) VALUES ($1) RETURNING *;', [
                'sender',
            ])).rows[0];
            await (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2), ($3, $4);', [chat.id, res.locals.user.id, chat.id, userId]);
        }
        else {
            if (chat.latest_message) {
                const message = (await (0, db_1.query)('SELECT * FROM messages WHERE id = $1;', [
                    chat.latest_message,
                ])).rows[0];
                const sender = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [message.sender])).rows[0];
                message.sender = sender;
                chat.latest_message = message;
            }
        }
    }
    else {
        // Create Chat if not exist
        chat = (await (0, db_1.query)('INSERT INTO chats (chat_name) VALUES ($1) RETURNING *;', [
            'sender',
        ])).rows[0];
        await (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2), ($3, $4);', [chat.id, res.locals.user.id, chat.id, userId]);
    }
    const users = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id IN ($1, $2);', [res.locals.user.id, userId])).rows;
    chat.users = users;
    res.status(http_status_codes_1.StatusCodes.OK).json(chat);
};
exports.accessChat = accessChat;
const fetchChats = async (req, res) => {
    let chats = (await (0, db_1.query)('SELECT id, chat_name, is_group_chat, group_admin, image_url, latest_message FROM chats INNER JOIN (SELECT * FROM chat_user WHERE user_id = $1) chat_user ON chats.id = chat_user.chat_id', [res.locals.user.id])).rows;
    for (const chat of chats) {
        const users = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])).rows;
        chat.users = users;
        if (chat.group_admin) {
            const groupAdmin = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])).rows[0];
            chat.group_admin = groupAdmin;
        }
        if (chat.latest_message) {
            const message = (await (0, db_1.query)('SELECT * FROM messages WHERE id = $1;', [
                chat.latest_message,
            ])).rows[0];
            const sender = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [message.sender])).rows[0];
            message.sender = sender;
            chat.latest_message = message;
        }
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(chats);
};
exports.fetchChats = fetchChats;
const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        throw new errors_1.BadRequestError('Please fill all the fields!');
    }
    const users = JSON.parse(req.body.users);
    users.push(res.locals.user.id);
    if (users.length < 2) {
        throw new errors_1.BadRequestError('More than 2 users required to form a group chat');
    }
    const groupChat = (await (0, db_1.query)('INSERT INTO chats (chat_name, is_group_chat, group_admin) VALUES ($1, $2, $3) RETURNING *;', [req.body.name, true, res.locals.user.id])).rows[0];
    groupChat.group_admin = res.locals.user;
    const groupUsers = [];
    for (const user of users) {
        await (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2)', [
            groupChat.id,
            user,
        ]);
        const fullUser = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [user])).rows[0];
        groupUsers.push(fullUser);
    }
    groupChat.users = groupUsers;
    res.status(http_status_codes_1.StatusCodes.OK).json(groupChat);
};
exports.createGroupChat = createGroupChat;
const removeFromGroupChat = async (req, res) => {
    const { chatId, userId } = req.body;
    const removed = (await (0, db_1.query)('DELETE FROM chat_user WHERE chat_id = $1 AND user_id = $2 RETURNING *;', [chatId, userId])).rows[0];
    if (!removed) {
        throw new errors_1.NotFoundError('User with id ' + userId + ' in chat with id ' + chatId + ' not found!');
    }
    else {
        const chat = (await (0, db_1.query)('SELECT id, chat_name, is_group_chat, image_url, group_admin FROM chats WHERE id = $1;', [chatId])).rows[0];
        const groupAdmin = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])).rows[0];
        chat.group_admin = groupAdmin;
        const users = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])).rows;
        chat.users = users;
        // console.log(chat);
        // console.log(userId);
        if (chat.group_admin.id === userId) {
            if (users.length > 0) {
                chat.group_admin = users[0];
                // console.log(users[0]);
                const newChat = (await (0, db_1.query)('UPDATE chats SET group_admin = $1 WHERE id = $2;', [
                    users[0].id,
                    chatId,
                ])).rows[0];
                // console.log(newChat);
            }
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(chat);
    }
};
exports.removeFromGroupChat = removeFromGroupChat;
const addToGroupChat = async (req, res) => {
    const { chatId, userId } = req.body;
    await (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2);', [
        chatId,
        userId,
    ]);
    const chat = (await (0, db_1.query)('SELECT id, chat_name, is_group_chat,image_url, group_admin FROM chats WHERE id = $1;', [chatId])).rows[0];
    const groupAdmin = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])).rows[0];
    chat.group_admin = groupAdmin;
    const users = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])).rows;
    chat.users = users;
    res.status(http_status_codes_1.StatusCodes.OK).json(chat);
};
exports.addToGroupChat = addToGroupChat;
const renameGroupChat = async (req, res) => {
    const { chatId, chatName } = req.body;
    const chat = (await (0, db_1.query)('UPDATE chats SET chat_name = $1 WHERE id = $2 RETURNING *', [
        chatName,
        chatId,
    ])).rows[0];
    if (!chat) {
        throw new errors_1.NotFoundError(`Chat with id ${chatId} not found!`);
    }
    else {
        const groupAdmin = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])).rows[0];
        chat.group_admin = groupAdmin;
        const users = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])).rows;
        chat.users = users;
        res.status(http_status_codes_1.StatusCodes.OK).json(chat);
    }
};
exports.renameGroupChat = renameGroupChat;
const updateGroupChatImage = async (req, res) => {
    const { image_url } = req.body;
    const { id } = req.params;
    const chat = (await (0, db_1.query)('UPDATE chats SET image_url = $1 WHERE id = $2 RETURNING *', [
        image_url,
        id,
    ])).rows[0];
    if (!chat) {
        throw new errors_1.NotFoundError(`Chat with id ${id} not found!`);
    }
    else {
        if (chat.latest_message) {
            const message = (await (0, db_1.query)('SELECT * FROM messages WHERE id = $1;', [
                chat.latest_message,
            ])).rows[0];
            const sender = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [message.sender])).rows[0];
            message.sender = sender;
            chat.latest_message = message;
        }
        const groupAdmin = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])).rows[0];
        chat.group_admin = groupAdmin;
        const users = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])).rows;
        chat.users = users;
        res.status(http_status_codes_1.StatusCodes.OK).json(chat);
    }
};
exports.updateGroupChatImage = updateGroupChatImage;
