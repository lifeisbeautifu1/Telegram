import express from 'express';

import 'express-async-errors';
import 'dotenv/config';
import 'colors';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';

import errorHandler from './middleware/error';
import auth from './middleware/auth';
import notFound from './middleware/notFound';

import authRouter from './routes/auth';
import chatRouter from './routes/chat';

const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/api/auth', authRouter);
app.use('/api/chat', auth, chatRouter);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`.green.bold)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
