import { useEffect } from 'react';
import { RiShieldStarFill } from 'react-icons/ri';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setNewChatName } from '../features/chat/chat';
import { Avatar } from './';

const EditGroupChat = () => {
  const { selectedChat, newChatName } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNewChatName(selectedChat?.chat_name!));
  }, [selectedChat, dispatch]);

  return (
    <div className="w-full  h-full bg-slate-100 pb-12 dark:bg-slate-700 overflow-y-scroll">
      <div className="w-3/5 mx-auto h-full flex flex-col">
        <div className="bg-white dark:bg-slate-600 rounded-lg flex flex-col items-center p-4 mt-8">
          <Avatar size="xl" letter={selectedChat?.chat_name[0]!} />
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
