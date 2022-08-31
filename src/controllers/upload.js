"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const http_status_codes_1 = require("http-status-codes");
const streamifier_1 = __importDefault(require("streamifier"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImage = async (req, res) => {
    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            var _a;
            const stream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (result)
                    resolve(result);
                else
                    reject(error);
            });
            streamifier_1.default.createReadStream((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.buffer).pipe(stream);
        });
    };
    const result = await streamUpload(req);
    res.status(200).send(result);
};
exports.uploadImage = uploadImage;
const deleteImage = async (req, res) => {
    let id = req.params.id;
    cloudinary_1.v2.uploader.destroy(id, function (result) {
        console.log(result);
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Deleted' });
};
exports.deleteImage = deleteImage;
