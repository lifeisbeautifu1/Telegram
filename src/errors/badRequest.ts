import { StatusCodes } from 'http-status-codes';
import CustomApiError from './error';

class BadRequestError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
