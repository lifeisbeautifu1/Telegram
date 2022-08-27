import { IUser } from '../interfaces';
import { useAppDispatch } from '../app/hooks';
import { removeSelectedUser } from '../features/users/users';

interface UserPillProps {
  user: IUser;
}

const UserPill: React.FC<UserPillProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="bg-sky-400 cursor-pointer capitalize text-white rounded text-xs py-[2px] px-1 flex items-center gap-1"
      onClick={() => dispatch(removeSelectedUser(user))}
    >
      {user.username}
      <div className="w-3 h-3 flex rounded-full items-center justify-center bg-sky-100 text-sky-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-2 h-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserPill;
