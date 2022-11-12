"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.CustomApiError = void 0;
var error_1 = require("./error");
Object.defineProperty(exports, "CustomApiError", { enumerable: true, get: function () { return __importDefault(error_1).default; } });
var badRequest_1 = require("./badRequest");
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return __importDefault(badRequest_1).default; } });
var notFound_1 = require("./notFound");
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return __importDefault(notFound_1).default; } });
var unauthorized_1 = require("./unauthorized");
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return __importDefault(unauthorized_1).default; } });
