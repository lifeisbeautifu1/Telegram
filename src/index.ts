import express from 'express';

import 'express-async-errors';
import 'dotenv/config';
import 'colors';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import errorHandler from './middleware/error';
import notFound from './middleware/notFound';

import authRouter from './routes/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.enable('trust proxy');

app.use('/api/auth', authRouter);

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
