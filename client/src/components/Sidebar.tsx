import { AiOutlineSearch } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';
import {
  fetchChats,
  setCreateChat,
  setIsChatInfo,
} from '../features/chat/chat';
import { SidebarChat } from './';
import { getSenderFull } from '../utils/chat';

interface SidebarProps {
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const Sidebar: React.FC<SidebarProps> = ({ socket }) => {
  const dispatch = useAppDispatch();

  const { refetch } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch, refetch]);

  const { pathname } = useLocation();

  const [filter, setFilter] = useState('');

  const { chats } = useAppSelector((state) => state.chat);

  const { user } = useAppSelector((state) => state.auth);

  const [filteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  useEffect(() => {
    if (!filter) {
      setFilteredChats(chats);
    } else {
      setFilteredChats(
        chats.filter((chat) => {
          const sender = getSenderFull(user!, chat?.users);
          const chatName = chat?.is_group_chat
            ? chat?.chat_name
            : sender?.username;
          return chatName?.toLowerCase()?.includes(filter.toLowerCase());
        })
      );
    }
  }, [filter, chats, user]);

  return (
    <div className="w-[30%] sidebar border-r border-gray-200 dark:border-gray-500 dark:bg-slate-600 flex flex-col">
      <div className="py-[11px] px-4 flex  items-center gap-4 justify-center">
        <div className="shadow-inner flex items-center gap-2 bg-[#edeef0]/50 py-[5px] px-[8px] dark:bg-slate-500 w-full rounded-md text-xl relative">
          <AiOutlineSearch className="text-gray-600 dark:text-gray-300" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search"
            className="dark:placeholder:text-gray-300 dark:text-gray-300 bg-transparent w-full h-full outline-none text-sm"
          />
        </div>
        <div
          className="w-7 h-7 relative group"
          onClick={() => dispatch(setCreateChat(true))}
        >
          <IoCreateOutline className="w-full h-full cursor-pointer text-sky-400" />
          <span className="tooltip py-1 whitespace-nowrap px-2 absolute left-[-0%] top-[125%] rounded before:border-gray-100 bg-gray-100 dark:bg-slate-500 text-gray-500 dark:text-gray-300  text-xs shadow invisible group-hover:visible translate-x-[-37%]">
            Create chat
          </span>
        </div>
      </div>
      <div className=" h-full flex flex-col overflow-y-scroll">
        {filteredChats &&
          filteredChats.map((chat) => (
            <SidebarChat socket={socket} key={chat.id} chat={chat} />
          ))}
      </div>

      <div className="mt-auto flex items-center justify-evenly py-3 border-t border-gray-200 dark:border-gray-500">
        <Link
          onClick={() => dispatch(setIsChatInfo(false))}
          to="/messanger/contacts"
          className={pathname === '/messanger/contacts' ? 'active' : ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6  cursor-pointer text-gray-400 hover:text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
        </svg>

        <Link
          to="/messanger"
          className={pathname === '/messanger' ? 'active' : ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
          </svg>
        </Link>
        <Link
          to="/messanger/settings"
          onClick={() => dispatch(setIsChatInfo(false))}
          className={pathname === '/messanger/settings' ? 'active' : ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 cursor-pointer"
          >
            <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
            <path
              fillRule="evenodd"
              d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
