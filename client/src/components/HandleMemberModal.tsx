import { useRef } from 'react';
import { BsTelegram } from 'react-icons/bs';
import { Socket } from 'socket.io-client';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsHandleMember } from '../features/app/app';
import {
  addToGroupChat,
  removeFromGroupChat,
  sendMessage,
  leaveGroupChat,
} from '../features/chat/chat';
import { setSelectedUser } from '../features/users/users';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';

interface HandleMemberModalProps {
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const HandleMemberModal: React.FC<HandleMemberModalProps> = ({ socket }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const { isHandleMember, action } = useAppSelector((state) => state.app);

  const { user } = useAppSelector((state) => state.auth);

  const { selectedChat } = useAppSelector((state) => state.chat);

  const { selectedUser } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const handleAddUser = () => {
    dispatch(
      sendMessage({
        chatId: selectedChat?.id!,
        content: `Added ${selectedUser?.username} to chat.`,
      })
    );
    dispatch(addToGroupChat());
    socket?.current?.emit('sendMessage', {
      sender: user,
      chat: {
        users: selectedChat?.users,
      },
    });
    socket?.current?.emit('refetchChats', selectedUser?.id!);
    dispatch(setSelectedUser(null));
    dispatch(setIsHandleMember(false));
  };

  const handleLeave = () => {
    dispatch(
      sendMessage({
        chatId: selectedChat?.id!,
        content: `Left the chat.`,
      })
    );
    dispatch(leaveGroupChat());
    socket?.current?.emit('sendMessage', {
      sender: user,
      chat: {
        users: selectedChat?.users,
      },
    });
    dispatch(setIsHandleMember(false));
  };

  const handleRemoveUser = () => {
    dispatch(
      sendMessage({
        chatId: selectedChat?.id!,
        content: `Removed ${selectedUser?.username} from chat.`,
      })
    );
    dispatch(removeFromGroupChat());
    socket?.current?.emit('sendMessage', {
      sender: user,
      chat: {
        users: selectedChat?.users,
      },
    });
    socket?.current?.emit('refetchChats', selectedUser?.id!);
    dispatch(setSelectedUser(null));
    dispatch(setIsHandleMember(false));
  };

  return (
    <div
      className={`absolute z-10 inset-0 bg-black/50 flex items-center justify-center transition duration-300 ${
        isHandleMember ? 'opacity-1 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) => {
        if (
          e.target !== modalContentRef?.current &&
          !modalContentRef?.current?.contains(e.target as Node)
        )
          dispatch(setIsHandleMember(false));
      }}
    >
      <div
        ref={modalContentRef}
        className="w-[250px] h-[200px] p-4 rounded-lg flex flex-col shadow relative dark:bg-slate-700 dark:border dark:border-gray-500  bg-stone-100 items-center "
      >
        <div className="p-1 mt-2 bg-white flex text-4xl items-center justify-center text-sky-400 border rounded-xl shadow border-gray-200">
          <BsTelegram />
        </div>
        <h1 className="mt-6 text-black dark:text-white font-semibold text-xs">
          Telegram
        </h1>
        <p className="mt-2 text-xs dark:text-gray-200">
          {action === 'ADD' ? (
            <span>Add {selectedUser?.username} to chat?</span>
          ) : action === 'REMOVE' ? (
            <span>Sure to remove {selectedUser?.username} from chat?</span>
          ) : (
            <span>Sure to leave the chat?</span>
          )}
        </p>
        <div className="mt-4 w-full flex items-center gap-2">
          <button
            className="text-xs w-full bg-white dark:bg-stone-400 dark:border-none py-1 px-4 border border-gray-200 dark:text-white rounded shadow"
            onClick={() => {
              dispatch(setSelectedUser(null));
              dispatch(setIsHandleMember(false));
            }}
          >
            Cancel
          </button>
          <button
            className="text-xs text-white  bg-blue-500 border-blue-500 w-full py-1 px-4  rounded shadow"
            onClick={() =>
              action === 'ADD'
                ? handleAddUser()
                : action === 'REMOVE'
                ? handleRemoveUser()
                : handleLeave()
            }
          >
            {action === 'ADD'
              ? 'Add'
              : action === 'REMOVE'
              ? 'Remove'
              : 'Leave'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandleMemberModal;
