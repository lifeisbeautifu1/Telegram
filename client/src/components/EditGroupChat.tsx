import { useEffect, useRef } from 'react';
import axios from 'axios';
import { RiShieldStarFill } from 'react-icons/ri';
import { Socket } from 'socket.io-client';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setNewChatName, updateImage } from '../features/chat/chat';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';
import { Avatar } from './';

interface EditGroupChatProps {
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const EditGroupChat: React.FC<EditGroupChatProps> = ({ socket }) => {
  const { selectedChat, newChatName } = useAppSelector((state) => state.chat);

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const imageUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setNewChatName(selectedChat?.chat_name!));
  }, [selectedChat, dispatch]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        if (selectedChat?.image_url) {
          const id = selectedChat?.image_url?.split('/')?.at(-1)?.split('.')[0];
          await axios.delete('/upload/' + id);
        }
        const { data: imageData } = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const url = imageData.secure_url;
        try {
          dispatch(updateImage(url));
          socket?.current?.emit('sendMessage', {
            sender: user,
            chat: {
              users: selectedChat?.users,
            },
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full  h-full bg-slate-100 pb-12 dark:bg-slate-700 overflow-y-scroll">
      <div className="w-3/5 mx-auto h-full flex flex-col">
        <div className="bg-white dark:bg-slate-600 rounded-lg flex flex-col items-center p-4 mt-8">
          <div className="relative">
            <Avatar
              size="xl"
              letter={selectedChat?.chat_name[0]!}
              image_url={selectedChat?.image_url}
            />
            <div
              onClick={() => imageUploadRef?.current?.click()}
              className="absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer text-2xl text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 bg-black/30 rounded-full"></div>
            <input
              type="file"
              className="hidden"
              accept=".png,.jpeg,.jpg"
              ref={imageUploadRef}
              // @ts-ignore
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <hr className="my-3 w-full dark:border-gray-500" />
          <input
            type="text"
            className="w-full text-xs bg-transparent outline-none text-gray-700 dark:text-white"
            value={newChatName}
            onChange={(e) => dispatch(setNewChatName(e.target.value))}
          />
          <hr className="w-full my-3 dark:border-gray-500" />
          <input
            type="text"
            placeholder="Description"
            className="w-full text-xs bg-transparent outline-none dark:placeholder:text-gray-300 text-gray-700"
          />
        </div>
        <p className="mt-2 pl-4 text-[10px] text-gray-500 dark:text-gray-300">
          You can provide an optional description for your group.
        </p>
        <div className="mt-8 bg-white dark:bg-slate-600 py-2 px-3 rounded-lg">
          <div className="w-full flex  gap-2  cursor-pointer">
            <div className="rounded text-white bg-blue-600 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
            </div>
            <div className="flex items-center w-full  justify-between gap-[2px] text-xs ">
              <span className="text-gray-700 dark:text-white">Group type</span>
              <span className="flex items-center gap-1 text-gray-400 dark:text-gray-200">
                Private
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <hr className="w-[93.5%] my-2 ml-auto dark:border-gray-500" />
          <div className="w-full flex  gap-2  cursor-pointer">
            <div className="rounded text-white bg-pink-400 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-center w-full  justify-between gap-[2px] text-xs ">
              <span className="text-gray-700 dark:text-white">
                Invite Links
              </span>
              <span className="flex items-center gap-[2px] text-gray-400 dark:text-gray-200">
                1
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <hr className="w-[93.5%] my-2 ml-auto dark:border-gray-500" />
          <div className="w-full flex  gap-2  cursor-pointer">
            <div className="rounded text-white bg-green-500 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-center w-full  justify-between gap-[2px] text-xs ">
              <span className="text-gray-700 dark:text-white">
                Chat history for new members
              </span>
              <span className="flex items-center  text-gray-400 dark:text-gray-200">
                Hidden
              </span>
            </div>
          </div>
          <hr className="w-[93.5%] my-2 ml-auto dark:border-gray-500" />
          <div className="w-full flex  gap-2  cursor-pointer">
            <div className="rounded text-white bg-orange-500 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-center w-full  justify-between gap-[2px] text-xs ">
              <span className="text-gray-700 dark:text-white">Permissions</span>
              <span className="flex items-center gap-[2px] text-gray-400 dark:text-gray-200">
                8/8
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <hr className="w-[93.5%] my-2 ml-auto dark:border-gray-500" />
          <div className="w-full flex  gap-2  cursor-pointer">
            <div className="rounded text-white bg-green-500 p-1">
              <RiShieldStarFill className="w-4 h-4" />
            </div>
            <div className="flex items-center w-full  justify-between gap-[2px] text-xs ">
              <span className="text-gray-700 dark:text-white">
                Administrators
              </span>
              <span className="flex items-center gap-[2px] text-gray-400 dark:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGroupChat;
