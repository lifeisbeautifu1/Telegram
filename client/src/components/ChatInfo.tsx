import { Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  renameGroupChat,
  sendMessage,
  setIsChatInfo,
} from '../features/chat/chat';
import {
  setAction,
  setIsAddMembers,
  setIsHandleMember,
  setIsEditGroupChat,
} from '../features/app/app';
import { Avatar, CreateChatUser, EditGroupChat } from './';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';

interface ChatInfoProps {
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const ChatInfo: React.FC<ChatInfoProps> = ({ socket }) => {
  const dispatch = useAppDispatch();

  const { isEditGroupChat } = useAppSelector((state) => state.app);

  const { selectedChat, newChatName } = useAppSelector((state) => state.chat);

  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full border-b border-gray-200 dark:border-gray-500 py-4 px-4 flex items-center justify-between text-sm dark:bg-slate-600">
        <div
          className="text-sky-400 cursor-pointer flex items-center"
          onClick={() => {
            if (isEditGroupChat) dispatch(setIsEditGroupChat(false));
            else dispatch(setIsChatInfo(false));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>
        <div className="dark:text-white translate-x-[-50%]">Info</div>
        <div
          className="text-sky-400 cursor-pointer"
          onClick={() => {
            if (isEditGroupChat) {
              dispatch(renameGroupChat());
              socket?.current?.emit('sendMessage', {
                sender: user,
                chat: {
                  users: selectedChat?.users,
                },
              });
              dispatch(
                sendMessage({
                  content: `Renamed group chat to ${newChatName}.`,
                  chatId: selectedChat?.id!,
                })
              );
            } else {
              if (selectedChat?.group_admin?.id === user?.id)
                dispatch(setIsEditGroupChat(true));
            }
          }}
        >
          {isEditGroupChat ? 'Done' : 'Edit'}
        </div>
      </div>
      {isEditGroupChat ? (
        <EditGroupChat socket={socket} />
      ) : (
        <div className="w-full  h-full bg-slate-100 pb-12 dark:bg-slate-700 overflow-y-scroll  ">
          <div className="flex flex-col items-center w-[70%] mx-auto overflow-y-scroll">
            <div className="mt-12">
              <Avatar
                size="xl"
                letter={selectedChat?.chat_name[0]!}
                image_url={selectedChat?.image_url}
              />
            </div>
            <h1 className="mt-4 font-medium text-sm dark:text-white">
              {selectedChat?.chat_name}
            </h1>
            <p className="text-xs text-gray-400">
              {selectedChat?.users?.length} members
            </p>
            <div className="grid grid-cols-4  w-full gap-4">
              <div
                className="rounded-lg mt-6 bg-white dark:bg-slate-600 dark:text-sky-500 text-sky-400 flex flex-col items-center justify-center py-4  cursor-pointer"
                onClick={() => dispatch(setIsAddMembers(true))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>

                <span className="text-sm">Add</span>
              </div>
              <div className="rounded-lg mt-6 bg-white  dark:bg-slate-600 dark:text-sky-500 text-sky-400 flex flex-col items-center justify-center py-4  cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0118.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206z" />
                  <path
                    fillRule="evenodd"
                    d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 01-7.396-1.119 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Mute</span>
              </div>
              <div className="rounded-lg mt-6 bg-white  dark:bg-slate-600 dark:text-sky-500 text-sky-400 flex flex-col items-center justify-center py-4  cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-sm">Report</span>
              </div>
              <div
                className="rounded-lg mt-6 bg-white  dark:bg-slate-600 dark:text-sky-500 text-sky-400 flex flex-col items-center justify-center py-4 cursor-pointer"
                onClick={() => {
                  dispatch(setAction('LEAVE'));
                  dispatch(setIsHandleMember(true));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-sm">Leave</span>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-white  w-full flex flex-col">
              <div></div>
              <div className="flex flex-col">
                {selectedChat?.users?.map((u) => (
                  <CreateChatUser key={u.id} noOnline onChatInfo user={u} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInfo;
