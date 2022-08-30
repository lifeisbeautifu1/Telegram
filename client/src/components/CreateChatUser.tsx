import { IUser } from '../interfaces';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Avatar } from './';
import { setSelectedUser } from '../features/users/users';
import { setIsHandleMember, setAction } from '../features/app/app';

interface CreateChatUserProps {
  user: IUser;
  noOnline?: boolean;
  onChatInfo?: boolean;
  onAddMembers?: boolean;
}

const CreateChatUser: React.FC<CreateChatUserProps> = ({
  user,
  noOnline,
  onChatInfo,
  onAddMembers,
}) => {
  const { onlineUsers } = useAppSelector((state) => state.users);

  const { user: currentUser } = useAppSelector((state) => state.auth);

  const { selectedChat } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();
  return (
    <div
      className={`w-full px-2 py-1 bg-white ${
        onChatInfo ? 'dark:bg-slate-600' : 'dark:bg-slate-500 rounded '
      }  flex  gap-2 ${onAddMembers && 'cursor-pointer'}`}
      onClick={() => {
        if (onAddMembers) {
          dispatch(setSelectedUser(user));
          dispatch(setAction('ADD'));
          dispatch(setIsHandleMember(true));
        }
      }}
    >
      <div className="relative">
        <Avatar letter={user.username[0]} />
        {onlineUsers.map((user) => user?.id).includes(user?.id) &&
          !noOnline && (
            <span className="bottom-0 left-8 absolute  w-3 h-3 bg-white border-2 border-sky-400 dark:border-gray-800 rounded-full"></span>
          )}
      </div>
      <div
        className={`overflow-hidden w-full py-[2px] flex   h-[44px] ${
          onChatInfo
            ? 'border-b border-gray-200 dark:border-gray-500 justify-between flex-row'
            : 'justify-center flex-col'
        }`}
      >
        <div>
          <h1 className="text-xs capitalize font-medium flex  justify-between items-center dark:text-white">
            {user?.username}{' '}
          </h1>
          <p className={'text-xs w-full'}>
            {onlineUsers.map((user) => user?.id).includes(user?.id) ? (
              <span className="text-sky-400">Online</span>
            ) : (
              <span className="text-gray-400 dark:text-gray-300">
                last seen 38 minutes ago
              </span>
            )}
          </p>
        </div>
        {onChatInfo && selectedChat?.group_admin?.id === user?.id ? (
          <div className="text-xs text-gray-400 dark:text-gray-300 pt-2">
            owner
          </div>
        ) : (
          onChatInfo &&
          selectedChat?.group_admin?.id === currentUser?.id && (
            <div
              className="text-red-500 cursor-pointer pt-2"
              onClick={() => {
                dispatch(setSelectedUser(user));
                dispatch(setAction('REMOVE'));
                dispatch(setIsHandleMember(true));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CreateChatUser;