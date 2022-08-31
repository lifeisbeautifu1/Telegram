"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var auth_2 = require("../middleware/auth");
var router = (0, express_1.Router)();
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
router.get('/logout', auth_1.logout);
router.get('/me', auth_2["default"], auth_1.me);
exports["default"] = router;
