"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const auth_1 = __importDefault(require("../features/auth/auth"));
const chat_1 = __importDefault(require("../features/chat/chat"));
const users_1 = __importDefault(require("../features/users/users"));
const app_1 = __importDefault(require("../features/app/app"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        auth: auth_1.default,
        chat: chat_1.default,
        users: users_1.default,
        app: app_1.default,
    },
});
