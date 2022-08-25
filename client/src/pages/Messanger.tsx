import { useEffect } from 'react';

import { useAppDispatch } from '../app/hooks';
import { fetchChats } from '../features/chat/chat';
import { Sidebar, Chat } from '../components';

const Messanger = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

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
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Messanger;
