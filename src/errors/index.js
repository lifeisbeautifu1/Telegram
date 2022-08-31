"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.CustomApiError = void 0;
var error_1 = require("./error");
__createBinding(exports, error_1, "default", "CustomApiError");
var badRequest_1 = require("./badRequest");
__createBinding(exports, badRequest_1, "default", "BadRequestError");
var notFound_1 = require("./notFound");
__createBinding(exports, notFound_1, "default", "NotFoundError");
var unauthorized_1 = require("./unauthorized");
__createBinding(exports, unauthorized_1, "default", "UnauthorizedError");
