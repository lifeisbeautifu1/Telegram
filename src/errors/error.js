"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomApiError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
    }
}
exports.default = CustomApiError;
