import express from 'express';

import 'express-async-errors';
import 'dotenv/config';
import 'colors';

import { Server } from 'socket.io';

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
import userRouter from './routes/user';
import messageRouter from './routes/message';

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
app.use('/api/user', auth, userRouter);
app.use('/api/message', auth, messageRouter);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    const server = app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`.green.bold)
    );
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
    });
    io.on('connection', (socket) => {
      console.log('User connected'.green.bold);

      socket.on('setup', (id) => {
        socket.join(id);
      });

      socket.on('joinChat', (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`.blue.bold);
      });

      socket.on('sendMessage', (newMessageReceived) => {
        const chat = newMessageReceived.chat;
        console.log('new message!');
        if (!chat.users) return;

        chat.users.forEach((user: any) => {
          if (user.id === newMessageReceived.sender.id) return;
          socket.in(user.id).emit('messageReceived', newMessageReceived);
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
