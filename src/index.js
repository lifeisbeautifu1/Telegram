"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("express-async-errors");
require("dotenv/config");
require("colors");
const socket_io_1 = require("socket.io");
// import cors from 'cors';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// import helmet from 'helmet';
// import rateLimiter from 'express-rate-limit';
const error_1 = __importDefault(require("./middleware/error"));
const auth_1 = __importDefault(require("./middleware/auth"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const auth_2 = __importDefault(require("./routes/auth"));
const chat_1 = __importDefault(require("./routes/chat"));
const user_1 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const upload_1 = __importDefault(require("./routes/upload"));
const users_1 = require("./utils/users");
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// app.use(helmet());
app.use((0, cookie_parser_1.default)());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
}
app.use('/api/auth', auth_2.default);
app.use('/api/chat', auth_1.default, chat_1.default);
app.use('/api/user', auth_1.default, user_1.default);
app.use('/api/message', auth_1.default, message_1.default);
app.use('/api/upload', auth_1.default, upload_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
});
app.use(error_1.default);
app.use(notFound_1.default);
const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.green.bold));
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: '*',
            },
        });
        io.on('connection', (socket) => {
            console.log('User connected'.green.bold);
            socket.on('setup', (id) => {
                socket.join(id);
            });
            socket.on('addUser', (userId) => {
                (0, users_1.addUser)(userId, socket.id);
                io.emit('getUsers', users_1.users.map((user) => ({ id: user.userId })));
            });
            socket.on('disconnect', () => {
                console.log('User disconnected'.red.bold);
                (0, users_1.removeUser)(socket.id);
                io.emit('getUsers', users_1.users);
            });
            socket.on('joinChat', (room) => {
                socket.join(room);
                console.log(`User joined room ${room}`.blue.bold);
            });
            socket.on('refetchChats', (userId) => {
                const user = (0, users_1.getUser)(userId);
                if (user)
                    socket.in(user.userId).emit('messageReceived', '');
            });
            socket.on('sendMessage', (newMessageReceived) => {
                const chat = newMessageReceived.chat;
                if (!chat.users)
                    return;
                chat.users.forEach((user) => {
                    if (user.id === newMessageReceived.sender.id)
                        return;
                    socket.in(user.id).emit('messageReceived', newMessageReceived);
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
