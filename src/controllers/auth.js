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
exports.me = exports.register = exports.logout = exports.login = void 0;
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var db_1 = require("../db/db");
var validation_1 = require("../utils/validation");
var http_status_codes_1 = require("http-status-codes");
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, errors, user, match, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                errors = (0, validation_1.validateLoginInput)(username, password).errors;
                if (Object.keys(errors).length > 0)
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors })];
                return [4 /*yield*/, (0, db_1.query)('SELECT id, username, password, email, image_url FROM users WHERE username = $1 LIMIT 1;', [username])];
            case 1:
                user = (_b.sent()).rows[0];
                if (!user)
                    errors.username = 'User not found!';
                if (Object.keys(errors).length > 0)
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors })];
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
            case 2:
                match = _b.sent();
                if (!match)
                    errors.password = 'Password is incorrect';
                if (Object.keys(errors).length > 0)
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors })];
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
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    image_url: user.image_url
                });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.cookie('token', '', {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: +new Date(0),
            // sameSite: 'strict',
            sameSite: 'none',
            path: '/'
        });
        res.json({ message: 'Logout' });
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, confirmPassword, errors, userWithUsername, userWithEmail, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword;
                errors = (0, validation_1.validateRegisterInput)(username, email, password, confirmPassword).errors;
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM users WHERE username = $1;', [username])];
            case 1:
                userWithUsername = _b.sent();
                if (userWithUsername.rows[0])
                    errors.username = "User with username ".concat(username, " already exist");
                return [4 /*yield*/, (0, db_1.query)('SELECT * FROM users WHERE email = $1;', [
                        email,
                    ])];
            case 2:
                userWithEmail = _b.sent();
                if (userWithEmail.rows[0])
                    errors.email = "User with email ".concat(email, " already exist");
                if (Object.keys(errors).length > 0)
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ errors: errors })];
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 6)];
            case 3:
                password = _b.sent();
                return [4 /*yield*/, (0, db_1.query)('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, image_url;', [username, email, password])];
            case 4:
                user = _b.sent();
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
                res.status(http_status_codes_1.StatusCodes.OK).json(user.rows[0]);
                return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var me = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(http_status_codes_1.StatusCodes.OK).json(res.locals.user);
        return [2 /*return*/];
    });
}); };
exports.me = me;
