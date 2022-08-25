import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';

import { Avatar } from './';
import { IUser } from '../interfaces';
import { accessChat } from '../features/chat/chat';

interface SidebarUserProps {
  user: IUser;
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const SidebarUser: React.FC<SidebarUserProps> = ({ user, socket }) => {
  const { onlineUsers } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <div
      className="w-full p-2 flex gap-2 cursor-pointer hover:bg-stone-50"
      onClick={() => {
        dispatch(accessChat(user.id));
        navigate('/messanger');
        socket?.current?.emit('refetchChats', user.id);
      }}
    >
      <div className="relative">
        <Avatar letter={user.username[0]} />
        {onlineUsers.map((user) => user.id).includes(user.id) && (
          <span className="bottom-0 left-8 absolute  w-3 h-3 bg-white border-2 border-sky-400 dark:border-gray-800 rounded-full"></span>
        )}
      </div>
      <div className="overflow-hidden w-full py-[2px] flex flex-col justify-center">
        <h1 className="text-xs capitalize font-medium flex  justify-between items-center">
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
    </div>
  );
};

export default SidebarUser;
