"use strict";
exports.__esModule = true;
exports.getUser = exports.removeUser = exports.addUser = exports.users = void 0;
exports.users = [];
var addUser = function (userId, socketId) {
    !exports.users.some(function (user) { return user.userId === userId; }) &&
        exports.users.push({ userId: userId, socketId: socketId });
};
exports.addUser = addUser;
var removeUser = function (socketId) {
    exports.users = exports.users.filter(function (user) { return user.socketId !== socketId; });
};
exports.removeUser = removeUser;
var getUser = function (userId) {
    return exports.users.find(function (user) { return user.userId === userId; });
};
exports.getUser = getUser;
