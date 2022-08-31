"use strict";
exports.__esModule = true;
var express_1 = require("express");
var message_1 = require("../controllers/message");
var router = (0, express_1.Router)();
router.post('/', message_1.sendMessage);
router.get('/:chatId', message_1.getAllMessages);
exports["default"] = router;
