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
var express_1 = require("express");
var path_1 = require("path");
require("express-async-errors");
require("dotenv/config");
require("colors");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var morgan_1 = require("morgan");
var helmet_1 = require("helmet");
// import rateLimiter from 'express-rate-limit';
var error_1 = require("./middleware/error");
var auth_1 = require("./middleware/auth");
var notFound_1 = require("./middleware/notFound");
var auth_2 = require("./routes/auth");
var chat_1 = require("./routes/chat");
var user_1 = require("./routes/user");
var message_1 = require("./routes/message");
var upload_1 = require("./routes/upload");
var users_1 = require("./utils/users");
var app = (0, express_1["default"])();
app.set('trust proxy', 1);
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])('dev'));
app.use((0, helmet_1["default"])());
app.use((0, cookie_parser_1["default"])());
app.use((0, cors_1["default"])({
    origin: 'http://localhost:5000',
    credentials: true
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH');
    res.header('Content-Security-Policy', 'default-src *; connect-src *; script-src *; object-src *;');
    res.header('X-Content-Security-Policy', 'default-src *; connect-src *; script-src *; object-src *');
    res.header('X-Webkit-CSP', "default-src *; connect-src *; script-src 'unsafe-inline' 'unsafe-eval' *; object-src *;");
});
if (process.env.NODE_ENV === 'production') {
    app.use(express_1["default"].static(path_1["default"].join(__dirname, '../client/build')));
}
app.use('/api/auth', auth_2["default"]);
app.use('/api/chat', auth_1["default"], chat_1["default"]);
app.use('/api/user', auth_1["default"], user_1["default"]);
app.use('/api/message', auth_1["default"], message_1["default"]);
app.use('/api/upload', auth_1["default"], upload_1["default"]);
app.get('*', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, '../client/build/index.html'));
});
app.use(error_1["default"]);
app.use(notFound_1["default"]);
var PORT = process.env.PORT || 5000;
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var server, io_1;
    return __generator(this, function (_a) {
        try {
            server = app.listen(PORT, function () {
                return console.log("Server is running on port ".concat(PORT).green.bold);
            });
            io_1 = new socket_io_1.Server(server, {
                cors: {
                    origin: '*'
                }
            });
            io_1.on('connection', function (socket) {
                console.log('User connected'.green.bold);
                socket.on('setup', function (id) {
                    socket.join(id);
                });
                socket.on('addUser', function (userId) {
                    (0, users_1.addUser)(userId, socket.id);
                    io_1.emit('getUsers', users_1.users.map(function (user) { return ({ id: user.userId }); }));
                });
                socket.on('disconnect', function () {
                    console.log('User disconnected'.red.bold);
                    (0, users_1.removeUser)(socket.id);
                    io_1.emit('getUsers', users_1.users);
                });
                socket.on('joinChat', function (room) {
                    socket.join(room);
                    console.log("User joined room ".concat(room).blue.bold);
                });
                socket.on('refetchChats', function (userId) {
                    var user = (0, users_1.getUser)(userId);
                    if (user)
                        socket["in"](user.userId).emit('messageReceived', '');
                });
                socket.on('sendMessage', function (newMessageReceived) {
                    var chat = newMessageReceived.chat;
                    if (!chat.users)
                        return;
                    chat.users.forEach(function (user) {
                        if (user.id === newMessageReceived.sender.id)
                            return;
                        socket["in"](user.id).emit('messageReceived', newMessageReceived);
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
        }
        return [2 /*return*/];
    });
}); };
start();
