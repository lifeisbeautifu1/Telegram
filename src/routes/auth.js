"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
router.get('/logout', auth_1.logout);
router.get('/me', auth_2.default, auth_1.me);
exports.default = router;
