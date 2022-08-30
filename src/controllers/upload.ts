import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req: Request, res: Response) => {
  const streamUpload = (req: Request) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) resolve(result);
        else reject(error);
      });
      streamifier.createReadStream(req?.file?.buffer!).pipe(stream);
    });
  };
  const result = await streamUpload(req);
  res.status(200).send(result);
};

export const deleteImage = async (req: Request, res: Response) => {
  let id: string = req.params.id;
  cloudinary.uploader.destroy(id, function (result) {
    console.log(result);
  });
  res.status(StatusCodes.OK).json({ message: 'Deleted' });
};
