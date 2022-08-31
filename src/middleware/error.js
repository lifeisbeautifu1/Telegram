"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
exports.default = async (err, req, res, next) => {
    if (err instanceof errors_1.CustomApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};
