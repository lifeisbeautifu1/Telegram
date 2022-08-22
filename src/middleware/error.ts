import { StatusCodes } from 'http-status-codes';
import { CustomApiError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export default async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
};
