"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNewMessage = exports.getSenderFull = exports.getSender = void 0;
const getSender = (loggedUser, users) => {
    var _a, _b, _c;
    return ((_a = users[0]) === null || _a === void 0 ? void 0 : _a.id) === (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id)
        ? (_b = users[1]) === null || _b === void 0 ? void 0 : _b.username
        : (_c = users[0]) === null || _c === void 0 ? void 0 : _c.username;
};
exports.getSender = getSender;
const getSenderFull = (loggedUser, users) => {
    var _a;
    return ((_a = users[0]) === null || _a === void 0 ? void 0 : _a.id) === (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id) ? users[1] : users[0];
};
exports.getSenderFull = getSenderFull;
const isNewMessage = (messages, m, i) => {
    var _a, _b, _c;
    if (i === (messages === null || messages === void 0 ? void 0 : messages.length) - 1)
        return true;
    else
        return ((_b = (_a = messages[i + 1]) === null || _a === void 0 ? void 0 : _a.sender) === null || _b === void 0 ? void 0 : _b.id) !== ((_c = m === null || m === void 0 ? void 0 : m.sender) === null || _c === void 0 ? void 0 : _c.id);
};
exports.isNewMessage = isNewMessage;
