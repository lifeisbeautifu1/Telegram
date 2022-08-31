"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const errors_1 = require("../errors");
exports.default = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        throw new errors_1.UnauthorizedError('Token not provided');
    const { username } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = (await (0, db_1.query)('SELECT id, username, email, image_url, last_online FROM users WHERE username = $1 LIMIT 1;', [username])).rows[0];
    if (!user)
        throw new errors_1.UnauthorizedError('Unauthenticated');
    res.locals.user = user;
    return next();
};
