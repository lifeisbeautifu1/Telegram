"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.register = exports.logout = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const validation_1 = require("../utils/validation");
const http_status_codes_1 = require("http-status-codes");
const login = async (req, res) => {
    const { username, password } = req.body;
    const { errors } = (0, validation_1.validateLoginInput)(username, password);
    if (Object.keys(errors).length > 0)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors });
    const user = (await (0, db_1.query)('SELECT id, username, password, email, image_url, last_online FROM users WHERE username = $1 LIMIT 1;', [username])).rows[0];
    if (!user)
        errors.username = 'User not found!';
    if (Object.keys(errors).length > 0)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors });
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        errors.password = 'Password is incorrect';
    if (Object.keys(errors).length > 0)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors });
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
    res.status(http_status_codes_1.StatusCodes.OK).json({
        id: user.id,
        username: user.username,
        email: user.email,
        image_url: user.image_url,
        last_online: user.last_online,
    });
};
exports.login = login;
const logout = async (req, res) => {
    res.cookie('token', '', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: +new Date(0),
        // sameSite: 'strict',
        sameSite: 'none',
        path: '/',
    });
    res.json({ message: 'Logout' });
};
exports.logout = logout;
const register = async (req, res) => {
    let { username, email, password, confirmPassword } = req.body;
    const { errors } = (0, validation_1.validateRegisterInput)(username, email, password, confirmPassword);
    const userWithUsername = await (0, db_1.query)('SELECT * FROM users WHERE username = $1;', [username]);
    if (userWithUsername.rows[0])
        errors.username = `User with username ${username} already exist`;
    const userWithEmail = await (0, db_1.query)('SELECT * FROM users WHERE email = $1;', [
        email,
    ]);
    if (userWithEmail.rows[0])
        errors.email = `User with email ${email} already exist`;
    if (Object.keys(errors).length > 0)
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors });
    password = await bcryptjs_1.default.hash(password, 6);
    const user = await (0, db_1.query)('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, image_url;', [username, email, password]);
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
    res.status(http_status_codes_1.StatusCodes.OK).json(user.rows[0]);
};
exports.register = register;
const me = async (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json(res.locals.user);
};
exports.me = me;
