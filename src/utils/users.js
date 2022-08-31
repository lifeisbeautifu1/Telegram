"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.removeUser = exports.addUser = exports.users = void 0;
exports.users = [];
const addUser = (userId, socketId) => {
    !exports.users.some((user) => user.userId === userId) &&
        exports.users.push({ userId, socketId });
};
exports.addUser = addUser;
const removeUser = (socketId) => {
    exports.users = exports.users.filter((user) => user.socketId !== socketId);
};
exports.removeUser = removeUser;
const getUser = (userId) => {
    return exports.users.find((user) => user.userId === userId);
};
exports.getUser = getUser;
