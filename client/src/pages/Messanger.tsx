import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchChats, toggleRefetch } from '../features/chat/chat';
import { Sidebar, Chat } from '../components';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';

const Messanger = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { refetch } = useAppSelector((state) => state.chat);

  const socket = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:5000');

      socket.current.emit('setup', user.id);

      socket.current.on('messageReceived', () => {
        dispatch(toggleRefetch());
      });
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch, refetch]);

  return (
    <div className="h-screen w-screen  flex justify-center items-center px-4">
      <div className="rounded shadow-md border border-gray-200 max-w-[1124px] w-full max-h-[700px] h-full">
        <div className="relative px-2 py-2 flex items-center gap-2 border-b border-gray-200 bg-stone50">
          <div className="rounded-full h-3 w-3 cursor-pointer bg-red-500"></div>
          <div className="rounded-full h-3 w-3 cursor-pointer bg-yellow-500"></div>
          <div className="rounded-full h-3 w-3 cursor-pointer bg-green-500"></div>
          <h1 className="font-semibold text-gray-600 text-sm absolute left-[50%] translate-x-[-50%]">
            Telegram
          </h1>
        </div>
        <div className="flex app">
          <Sidebar socket={socket} />
          <Chat socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Messanger;
