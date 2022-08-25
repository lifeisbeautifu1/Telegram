import { IChat } from '../interfaces';
import { getSenderFull } from '../utils/chat';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setSelectedChat } from '../features/chat/chat';
import { formatDistanceToNow } from 'date-fns';

interface SidebarChatProps {
  chat: IChat;
}

const SidebarChat: React.FC<SidebarChatProps> = ({ chat }) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const sender = getSenderFull(user!, chat.users);
  // const image = chat.is_group_chat ? '' : sender.image_url;
  const chatName = chat.is_group_chat ? chat.chat_name : sender.username;
  return (
    <div
      className="w-full p-2 flex gap-2 cursor-pointer hover:bg-stone-50"
      onClick={() => dispatch(setSelectedChat(chat))}
    >
      <div className="relative">
        {chat.is_group_chat ? (
          <div className="inline-flex overflow-hidden relative justify-center items-center w-11 h-11 capitalize bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {chatName[0]}
            </span>
          </div>
        ) : (
          // <img
          //   className="w-10 h-10 rounded-full"
          //   src={sender.image_url}
          //   alt={''}
          // />
          <div className="inline-flex overflow-hidden relative justify-center items-center w-11 h-11 capitalize bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {sender.username[0]}
            </span>
          </div>
        )}
        {/* <span className="top-0 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> */}
      </div>
      <div className="overflow-hidden w-full py-[2px]">
        <h1 className="text-xs capitalize font-medium flex  justify-between items-center">
          {chatName}{' '}
          <span className="text-gray-400 text-[10px]">
            {chat?.latest_message?.created_at &&
              formatDistanceToNow(new Date(chat?.latest_message?.created_at!), {
                addSuffix: true,
              })}
          </span>
        </h1>
        <p className="text-xs box  text-gray-400 ">
          {chat?.latest_message?.content}
        </p>
      </div>
    </div>
  );
};

export default SidebarChat;
