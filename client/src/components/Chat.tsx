import React, { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { Socket } from 'socket.io-client';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchMessages, sendMessage } from '../features/chat/chat';
import { getSenderFull, isNewMessage } from '../utils/chat';
import { Message, Avatar } from './';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';

interface ChatProps {
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const Chat: React.FC<ChatProps> = ({ socket }) => {
  const dispatch = useAppDispatch();

  const {
    selectedChat: chat,
    messages,
    refetch,
  } = useAppSelector((state) => state.chat);

  const { user } = useAppSelector((state) => state.auth);

  const inputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState('');

  const [showPicker, setShowPicker] = useState(false);

  const emojiRef = useRef<any>(null);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setContent(content + emojiObject.emoji);
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        e.target !== emojiRef.current &&
        !emojiRef.current?.contains(e.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    window.addEventListener('click', clickOutside);
    return () => window.removeEventListener('click', clickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      sendMessage({
        chatId: chat?.id!,
        content,
      })
    );
    setContent('');
    socket?.current?.emit('sendMessage', {
      content,
      chat,
      sender: user,
    });
  };

  useEffect(() => {
    if (chat) {
      dispatch(fetchMessages(chat));
      inputRef?.current?.focus();
    }
  }, [chat, dispatch, refetch]);

  return (
    <div
      className={`${
        !chat && 'bg-neutral-100 flex items-center justify-center'
      } w-full`}
    >
      {!chat && (
        <span className="py-1 px-2 text-sm text-gray-400 bg-white rounded-[30px]">
          Select chat to start messaging
        </span>
      )}
      {chat && (
        <div className="h-full flex flex-col">
          <div className="py-2 px-4 flex items-center gap-2 border-b border-gray-200">
            <Avatar
              letter={
                chat && chat?.is_group_chat
                  ? chat?.chat_name[0]
                  : getSenderFull(user!, chat?.users).username[0]
              }
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-xs text-medium capitalize">
                {chat && chat?.is_group_chat
                  ? chat?.chat_name
                  : getSenderFull(user!, chat?.users).username}
              </h1>
              <p className="text-[10px] text-gray-400">
                {chat?.is_group_chat
                  ? `${chat?.users?.length} members`
                  : 'last seen 38 minutes ago'}
              </p>
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-sky-400 cursor-pointer transition duration-300 hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-sky-400 cursor-pointer transition duration-300 hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-sky-400 cursor-pointer transition duration-300 hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full h-full flex flex-col-reverse px-4 pb-4 overflow-y-scroll">
            {messages &&
              messages.map((m, index) => {
                return (
                  <Message
                    isNewMessage={isNewMessage(messages, m, index)}
                    key={m.id}
                    message={m}
                  />
                );
              })}
          </div>
          <form
            className="relative mt-auto flex items-center gap-4 py-3 px-4 border-t border-gray-200"
            onSubmit={handleSubmit}
          >
            {showPicker && (
              <div
                className="absolute
              -top-[630%] right-16"
              >
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 cursor-pointer text-gray-400 hover:text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={inputRef}
              placeholder="Write a message"
              className="rounded text-gray-700  px-2  placeholder:text-gray-300 w-full outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              ref={emojiRef}
              onClick={() => setShowPicker(!showPicker)}
              strokeWidth={1.5}
              stroke="currentColor"
              className="block ml-auto w-7 h-7 cursor-pointer text-gray-400 hover:text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
