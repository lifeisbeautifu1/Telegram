"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../controllers/message");
const router = (0, express_1.Router)();
router.post('/', message_1.sendMessage);
router.get('/:chatId', message_1.getAllMessages);
exports.default = router;
