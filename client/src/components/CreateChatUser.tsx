import { IUser } from '../interfaces';
import { useAppSelector } from '../app/hooks';
import { Avatar } from './';

interface CreateChatUserProps {
  user: IUser;
}

const CreateChatUser: React.FC<CreateChatUserProps> = ({ user }) => {
  const { onlineUsers } = useAppSelector((state) => state.users);
  return (
    <div className="w-full px-2 py-1 bg-white dark:bg-slate-500 rounded  flex items-center gap-2">
      <div className="relative">
        <Avatar letter={user.username[0]} />
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
            <span className="text-gray-400 dark:text-gray-300">
              last seen 38 minutes ago
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CreateChatUser;
