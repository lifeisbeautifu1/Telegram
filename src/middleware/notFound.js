"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
exports.default = async (req, res) => {
    res
        .status(http_status_codes_1.StatusCodes.NOT_FOUND)
        .json({ message: 'The page you are looking for does not exist.' });
};
