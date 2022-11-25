"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
const upload_1 = require("../controllers/upload");
router.post('/', upload.single('file'), upload_1.uploadImage);
router.delete('/:id', upload_1.deleteImage);
exports.default = router;
