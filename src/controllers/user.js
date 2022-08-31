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
exports.updateOnline = exports.updateImage = exports.updateUsername = exports.search = void 0;
var http_status_codes_1 = require("http-status-codes");
var jsonwebtoken_1 = require("jsonwebtoken");
var db_1 = require("../db/db");
var search = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = req.query.search || '';
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE LOWER(username) LIKE $1 AND username != $2', ['%' + search.toLowerCase().trim() + '%', res.locals.user.username])];
            case 1:
                users = (_a.sent()).rows;
                res.status(200).json(users);
                return [2 /*return*/];
        }
    });
}); };
exports.search = search;
var updateUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, updatedUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM users WHERE username = $1;', [username])];
            case 1:
                user = (_a.sent()).rows[0];
                if (!user) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        errors: {
                            username: 'Username already taken'
                        }
                    })];
            case 2: return [4 /*yield*/, (0, db_1.query)('UPDATE users SET username = $1 WHERE id = $2 RETURNING *;', [
                    username,
                    res.locals.user.id,
                ])];
            case 3:
                updatedUser = (_a.sent()).rows[0];
                token = jsonwebtoken_1["default"].sign({ username: username }, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                });
                res.cookie('token', token, {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    maxAge: 1000 * 3600 * 24 * 7,
                    // sameSite: 'strict',
                    sameSite: 'none',
                    path: '/'
                });
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser)];
        }
    });
}); };
exports.updateUsername = updateUsername;
var updateImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image_url, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image_url = req.body.image_url;
                return [4 /*yield*/, (0, db_1.query)('UPDATE users SET image_url = $1 WHERE id = $2 RETURNING *;', [
                        image_url,
                        res.locals.user.id,
                    ])];
            case 1:
                updatedUser = (_a.sent()).rows[0];
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser)];
        }
    });
}); };
exports.updateImage = updateImage;
var updateOnline = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var time, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                time = req.body.time;
                return [4 /*yield*/, (0, db_1.query)('UPDATE users SET last_online = $1 WHERE id = $2 RETURNING *;', [time, res.locals.user.id])];
            case 1:
                updatedUser = (_a.sent()).rows[0];
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser)];
        }
    });
}); };
exports.updateOnline = updateOnline;
