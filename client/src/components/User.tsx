import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Avatar } from '.';
import { IUser } from '../interfaces';
import {
  addSelectedUser,
  removeSelectedUser,
  resetSelectedUsers,
} from '../features/users/users';
import {
  accessChat,
  setCreateChat,
  setIsChatInfo,
} from '../features/chat/chat';

interface UserProps {
  user: IUser;
  contacts?: boolean;
  selected?: boolean;
  socket?: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const User: React.FC<UserProps> = ({ user, socket, contacts }) => {
  const [selected, setSelected] = useState(false);

  const { onlineUsers, selectedUsers } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setSelected(selectedUsers.map((u) => u.id).includes(user.id));
  }, [selectedUsers, user.id]);

  return (
    <div
      className="w-full p-2 flex gap-2 cursor-pointer hover:bg-stone-50 dark:hover:bg-slate-500"
      onClick={() => {
        if (contacts) {
          dispatch(accessChat(user.id));
          dispatch(setCreateChat(false));
          dispatch(resetSelectedUsers());
          dispatch(setIsChatInfo(false));
          navigate('/messanger');
          socket?.current?.emit('refetchChats', user.id);
        } else {
          if (selected) {
            dispatch(removeSelectedUser(user));
          } else {
            dispatch(addSelectedUser(user));
          }
        }
      }}
    >
      <div className="relative">
        <Avatar letter={user.username[0]} image_url={user?.image_url} />
        {onlineUsers.map((user) => user.id).includes(user.id) && (
          <span className="bottom-0 left-8 absolute  w-3 h-3 bg-white border-2 border-sky-400 dark:border-gray-800 rounded-full"></span>
        )}
      </div>
      <div className="overflow-hidden w-full py-[2px] flex flex-col justify-center">
        <h1 className="text-xs capitalize font-medium flex  justify-between items-center dark:text-white">
          {user.username}{' '}
        </h1>
        <p className={'text-xs w-full'}>
          {onlineUsers.map((user) => user.id).includes(user.id) ? (
            <span className="text-sky-400">Online</span>
          ) : (
            <span className="text-gray-400">last seen 38 minutes ago</span>
          )}
        </p>
      </div>
      {!contacts && (
        <div className="flex items-center">
          <div
            className={`bg-gray-100 dark:bg-transparent dark:border dark:border-white rounded-full cursor-pointer flex items-center justify-center w-5 h-5 ${
              selected
                ? 'bg-sky-400 dark:bg-sky-400 text-white'
                : 'shadow-inner'
            }`}
          >
            {selected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
