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
exports.getAllMessages = exports.sendMessage = void 0;
var http_status_codes_1 = require("http-status-codes");
var db_1 = require("../db/db");
var errors_1 = require("../errors");
var sendMessage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, content, chatId, message, chat, users;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, content = _a.content, chatId = _a.chatId;
                if (!content || !chatId) {
                    throw new errors_1.BadRequestError('Invalid data passsed into request');
                }
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO messages (content, chat, sender) VALUES ($1, $2, $3) RETURNING *;', [content, chatId, res.locals.user.id])];
            case 1:
                message = (_b.sent()).rows[0];
                message.sender = res.locals.user;
                return [4 /*yield*/, (0, db_1.query)('UPDATE chats SET latest_message = $1 WHERE id = $2 RETURNING *;', [message.id, chatId])];
            case 2:
                chat = (_b.sent()).rows[0];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url FROM users INNER JOIN (SELECT * FROM chat_user WHERE chat_id = $1) chat_user ON users.id = chat_user.user_id;', [chat.id])];
            case 3:
                users = (_b.sent()).rows;
                chat.users = users;
                message.chat = chat;
                res.status(http_status_codes_1.StatusCodes.OK).json(message);
                return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
var getAllMessages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chatId, messages, _i, messages_1, message, sender, chat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = req.params.chatId;
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM messages WHERE chat = $1 ORDER BY created_at DESC;', [chatId])];
            case 1:
                messages = (_a.sent()).rows;
                _i = 0, messages_1 = messages;
                _a.label = 2;
            case 2:
                if (!(_i < messages_1.length)) return [3 /*break*/, 6];
                message = messages_1[_i];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url FROM users WHERE id = $1;', [
                        message.sender,
                    ])];
            case 3:
                sender = (_a.sent()).rows[0];
                message.sender = sender;
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM chats WHERE id = $1;', [chatId])];
            case 4:
                chat = (_a.sent())
                    .rows[0];
                message.chat = chat;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                res.status(http_status_codes_1.StatusCodes.OK).json(messages);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllMessages = getAllMessages;
