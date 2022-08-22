import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ message: 'The page you are looking for does not exist.' });
};
