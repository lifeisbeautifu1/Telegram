import {
  IChat,
  ServerToClientEvents,
  ClientToServerEvents,
} from '../interfaces';
import { getSenderFull } from '../utils/chat';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setCreateChat,
  setSelectedChat,
  setIsChatInfo,
} from '../features/chat/chat';
import { formatDistanceToNow } from 'date-fns';
import { Socket } from 'socket.io-client';
import { Avatar } from './';
import { setIsEditGroupChat } from '../features/app/app';

interface SidebarChatProps {
  chat: IChat;
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const SidebarChat: React.FC<SidebarChatProps> = ({ chat, socket }) => {
  const { user } = useAppSelector((state) => state.auth);

  const { selectedChat } = useAppSelector((state) => state.chat);

  const { onlineUsers } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const sender = getSenderFull(user!, chat.users);
  const chatName = chat.is_group_chat ? chat.chat_name : sender.username;
  const image_url = chat.is_group_chat ? chat.image_url : sender.image_url;

  return (
    <div
      className={`w-full p-2 flex gap-2 cursor-pointer hover:bg-stone-50 dark:hover:bg-slate-500 ${
        selectedChat?.id === chat.id &&
        'bg-sky-400 dark:bg-slate-500 hover:bg-sky-400 dark:hover:bg-slate-500 text-white '
      }`}
      onClick={() => {
        dispatch(setSelectedChat(chat));
        dispatch(setCreateChat(false));
        dispatch(setIsChatInfo(false));
        dispatch(setIsEditGroupChat(false));
        socket?.current?.emit('joinChat', chat.id);
      }}
    >
      <div className="relative">
        {chat.is_group_chat ? (
          <Avatar letter={chatName[0]} image_url={image_url} />
        ) : (
          <>
            <Avatar letter={sender.username[0]} image_url={image_url} />
            {onlineUsers.map((user) => user.id).includes(sender.id) && (
              <span className="bottom-0 left-8 absolute  w-3 h-3 bg-white border-2 border-sky-400 dark:border-gray-800 rounded-full"></span>
            )}
          </>
        )}
      </div>

      <div className="overflow-hidden w-full py-[2px]">
        <h1 className="text-xs capitalize font-medium flex  items-center">
          <span className="box w-[35%] dark:text-white">{chatName}</span>
          <span
            className={`text-[10px] w-[65%] flex justify-end ${
              selectedChat?.id === chat.id
                ? 'text-white dark:text-gray-300'
                : 'text-gray-400'
            }`}
          >
            {chat?.latest_message?.created_at &&
              formatDistanceToNow(new Date(chat?.latest_message?.created_at!), {
                addSuffix: true,
              })}
          </span>
        </h1>
        <p
          className={`text-xs box ${
            selectedChat?.id === chat.id
              ? 'text-white dark:text-gray-300'
              : 'text-gray-400'
          }`}
        >
          {chat?.latest_message?.content}
        </p>
      </div>
    </div>
  );
};

export default SidebarChat;
