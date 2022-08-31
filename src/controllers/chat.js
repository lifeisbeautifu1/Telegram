"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateGroupChatImage = exports.renameGroupChat = exports.addToGroupChat = exports.removeFromGroupChat = exports.createGroupChat = exports.fetchChats = exports.accessChat = void 0;
var http_status_codes_1 = require("http-status-codes");
var db_1 = require("../db/db");
var errors_1 = require("../errors");
var accessChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, chat, message, sender, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                if (!userId)
                    throw new errors_1.BadRequestError('userId params not sent with request!');
                return [4 /*yield*/, (0, db_1.query)('SELECT id, COUNT(*) ,chat_name, is_group_chat, created_at, image_url, latest_message FROM chats INNER JOIN (SELECT * FROM chat_user WHERE user_id IN ($1, $2)) chat_user ON chats.id = chat_user.chat_id WHERE chats.is_group_chat = false GROUP BY id ORDER BY COUNT(*) DESC LIMIT 1;', [res.locals.user.id, userId])];
            case 1:
                chat = (_a.sent()).rows[0];
                if (!chat) return [3 /*break*/, 8];
                if (!(Number(chat === null || chat === void 0 ? void 0 : chat.count) !== 2)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO chats (chat_name) VALUES ($1) RETURNING *;', [
                        'sender',
                    ])];
            case 2:
                // Create Chat if not exist
                chat = (_a.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2), ($3, $4);', [chat.id, res.locals.user.id, chat.id, userId])];
            case 3:
                _a.sent();
                return [3 /*break*/, 7];
            case 4:
                if (!chat.latest_message) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM messages WHERE id = $1;', [
                        chat.latest_message,
                    ])];
            case 5:
                message = (_a.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [message.sender])];
            case 6:
                sender = (_a.sent()).rows[0];
                message.sender = sender;
                chat.latest_message = message;
                _a.label = 7;
            case 7: return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, (0, db_1.query)('INSERT INTO chats (chat_name) VALUES ($1) RETURNING *;', [
                    'sender',
                ])];
            case 9:
                // Create Chat if not exist
                chat = (_a.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2), ($3, $4);', [chat.id, res.locals.user.id, chat.id, userId])];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id IN ($1, $2);', [res.locals.user.id, userId])];
            case 12:
                users = (_a.sent()).rows;
                chat.users = users;
                res.status(http_status_codes_1.StatusCodes.OK).json(chat);
                return [2 /*return*/];
        }
    });
}); };
exports.accessChat = accessChat;
var fetchChats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chats, _i, chats_1, chat, users, groupAdmin, message, sender;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_1.query)('SELECT id, chat_name, is_group_chat, group_admin, image_url, latest_message FROM chats INNER JOIN (SELECT * FROM chat_user WHERE user_id = $1) chat_user ON chats.id = chat_user.chat_id', [res.locals.user.id])];
            case 1:
                chats = (_a.sent()).rows;
                _i = 0, chats_1 = chats;
                _a.label = 2;
            case 2:
                if (!(_i < chats_1.length)) return [3 /*break*/, 9];
                chat = chats_1[_i];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])];
            case 3:
                users = (_a.sent()).rows;
                chat.users = users;
                if (!chat.group_admin) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])];
            case 4:
                groupAdmin = (_a.sent()).rows[0];
                chat.group_admin = groupAdmin;
                _a.label = 5;
            case 5:
                if (!chat.latest_message) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM messages WHERE id = $1;', [
                        chat.latest_message,
                    ])];
            case 6:
                message = (_a.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [message.sender])];
            case 7:
                sender = (_a.sent()).rows[0];
                message.sender = sender;
                chat.latest_message = message;
                _a.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 2];
            case 9:
                res.status(http_status_codes_1.StatusCodes.OK).json(chats);
                return [2 /*return*/];
        }
    });
}); };
exports.fetchChats = fetchChats;
var createGroupChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, groupChat, groupUsers, _i, users_1, user, fullUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.users || !req.body.name) {
                    throw new errors_1.BadRequestError('Please fill all the fields!');
                }
                users = JSON.parse(req.body.users);
                users.push(res.locals.user.id);
                if (users.length < 2) {
                    throw new errors_1.BadRequestError('More than 2 users required to form a group chat');
                }
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO chats (chat_name, is_group_chat, group_admin) VALUES ($1, $2, $3) RETURNING *;', [req.body.name, true, res.locals.user.id])];
            case 1:
                groupChat = (_a.sent()).rows[0];
                groupChat.group_admin = res.locals.user;
                groupUsers = [];
                _i = 0, users_1 = users;
                _a.label = 2;
            case 2:
                if (!(_i < users_1.length)) return [3 /*break*/, 6];
                user = users_1[_i];
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2)', [
                        groupChat.id,
                        user,
                    ])];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [user])];
            case 4:
                fullUser = (_a.sent()).rows[0];
                groupUsers.push(fullUser);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                groupChat.users = groupUsers;
                res.status(http_status_codes_1.StatusCodes.OK).json(groupChat);
                return [2 /*return*/];
        }
    });
}); };
exports.createGroupChat = createGroupChat;
var removeFromGroupChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, chatId, userId, removed, chat, groupAdmin, users, newChat;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, chatId = _a.chatId, userId = _a.userId;
                return [4 /*yield*/, (0, db_1.query)('DELETE FROM chat_user WHERE chat_id = $1 AND user_id = $2 RETURNING *;', [chatId, userId])];
            case 1:
                removed = (_b.sent()).rows[0];
                if (!!removed) return [3 /*break*/, 2];
                throw new errors_1.NotFoundError('User with id ' + userId + ' in chat with id ' + chatId + ' not found!');
            case 2: return [4 /*yield*/, (0, db_1.query)('SELECT id, chat_name, is_group_chat, image_url, group_admin FROM chats WHERE id = $1;', [chatId])];
            case 3:
                chat = (_b.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])];
            case 4:
                groupAdmin = (_b.sent()).rows[0];
                chat.group_admin = groupAdmin;
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])];
            case 5:
                users = (_b.sent()).rows;
                chat.users = users;
                if (!(chat.group_admin.id === userId)) return [3 /*break*/, 7];
                if (!(users.length > 0)) return [3 /*break*/, 7];
                chat.group_admin = users[0];
                return [4 /*yield*/, (0, db_1.query)('UPDATE chats SET group_admin = $1 WHERE id = $2;', [
                        users[0].id,
                        chatId,
                    ])];
            case 6:
                newChat = (_b.sent()).rows[0];
                _b.label = 7;
            case 7:
                res.status(http_status_codes_1.StatusCodes.OK).json(chat);
                _b.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.removeFromGroupChat = removeFromGroupChat;
var addToGroupChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, chatId, userId, chat, groupAdmin, users;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, chatId = _a.chatId, userId = _a.userId;
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO chat_user (chat_id, user_id) VALUES ($1, $2);', [
                        chatId,
                        userId,
                    ])];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, db_1.query)('SELECT id, chat_name, is_group_chat,image_url, group_admin FROM chats WHERE id = $1;', [chatId])];
            case 2:
                chat = (_b.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])];
            case 3:
                groupAdmin = (_b.sent()).rows[0];
                chat.group_admin = groupAdmin;
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])];
            case 4:
                users = (_b.sent()).rows;
                chat.users = users;
                res.status(http_status_codes_1.StatusCodes.OK).json(chat);
                return [2 /*return*/];
        }
    });
}); };
exports.addToGroupChat = addToGroupChat;
var renameGroupChat = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, chatId, chatName, chat, groupAdmin, users;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, chatId = _a.chatId, chatName = _a.chatName;
                return [4 /*yield*/, (0, db_1.query)('UPDATE chats SET chat_name = $1 WHERE id = $2 RETURNING *', [
                        chatName,
                        chatId,
                    ])];
            case 1:
                chat = (_b.sent()).rows[0];
                if (!!chat) return [3 /*break*/, 2];
                throw new errors_1.NotFoundError("Chat with id ".concat(chatId, " not found!"));
            case 2: return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])];
            case 3:
                groupAdmin = (_b.sent()).rows[0];
                chat.group_admin = groupAdmin;
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])];
            case 4:
                users = (_b.sent()).rows;
                chat.users = users;
                res.status(http_status_codes_1.StatusCodes.OK).json(chat);
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.renameGroupChat = renameGroupChat;
var updateGroupChatImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image_url, id, chat, message, sender, groupAdmin, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image_url = req.body.image_url;
                id = req.params.id;
                return [4 /*yield*/, (0, db_1.query)('UPDATE chats SET image_url = $1 WHERE id = $2 RETURNING *', [
                        image_url,
                        id,
                    ])];
            case 1:
                chat = (_a.sent()).rows[0];
                if (!!chat) return [3 /*break*/, 2];
                throw new errors_1.NotFoundError("Chat with id ".concat(id, " not found!"));
            case 2:
                if (!chat.latest_message) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM messages WHERE id = $1;', [
                        chat.latest_message,
                    ])];
            case 3:
                message = (_a.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [message.sender])];
            case 4:
                sender = (_a.sent()).rows[0];
                message.sender = sender;
                chat.latest_message = message;
                _a.label = 5;
            case 5: return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE id = $1;', [chat.group_admin])];
            case 6:
                groupAdmin = (_a.sent()).rows[0];
                chat.group_admin = groupAdmin;
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])];
            case 7:
                users = (_a.sent()).rows;
                chat.users = users;
                res.status(http_status_codes_1.StatusCodes.OK).json(chat);
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateGroupChatImage = updateGroupChatImage;
