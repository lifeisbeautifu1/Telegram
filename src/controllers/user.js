"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnline = exports.updateImage = exports.updateUsername = exports.search = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const search = async (req, res) => {
    const search = req.query.search || '';
    const users = (await (0, db_1.query)('SELECT id, username, image_url, last_online FROM users WHERE LOWER(username) LIKE $1 AND username != $2', ['%' + search.toLowerCase().trim() + '%', res.locals.user.username])).rows;
    res.status(200).json(users);
};
exports.search = search;
const updateUsername = async (req, res) => {
    const { username } = req.body;
    const user = (await (0, db_1.query)('SELECT * FROM users WHERE username = $1;', [username])).rows[0];
    if (user) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: {
                username: 'Username already taken',
            },
        });
    }
    else {
        const updatedUser = (await (0, db_1.query)('UPDATE users SET username = $1 WHERE id = $2 RETURNING *;', [
            username,
            res.locals.user.id,
        ])).rows[0];
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, {
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
        return res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser);
    }
};
exports.updateUsername = updateUsername;
const updateImage = async (req, res) => {
    const { image_url } = req.body;
    const updatedUser = (await (0, db_1.query)('UPDATE users SET image_url = $1 WHERE id = $2 RETURNING *;', [
        image_url,
        res.locals.user.id,
    ])).rows[0];
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser);
};
exports.updateImage = updateImage;
const updateOnline = async (req, res) => {
    const { time } = req.body;
    const updatedUser = (await (0, db_1.query)('UPDATE users SET last_online = $1 WHERE id = $2 RETURNING *;', [time, res.locals.user.id])).rows[0];
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser);
};
exports.updateOnline = updateOnline;
