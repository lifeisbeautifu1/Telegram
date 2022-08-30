import express from 'express';
import multer from 'multer';
const upload = multer();

const router = express.Router();

import { uploadImage, deleteImage } from '../controllers/upload';

router.post('/', upload.single('file'), uploadImage);

router.delete('/:id', deleteImage);

export default router;
