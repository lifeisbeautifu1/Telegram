import { useRef, useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CreateChatUser } from './';
import { setIsAddMembers } from '../features/app/app';
import { searchUsers, resetSearchUsers } from '../features/users/users';

const AddMembersModal = () => {
  const { isAddMembers } = useAppSelector((state) => state.app);

  const { selectedChat } = useAppSelector((state) => state.chat);

  const modalContentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { searchUsers: users } = useAppSelector((state) => state.users);

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search.trim()) {
      dispatch(searchUsers(search));
    } else {
      dispatch(resetSearchUsers());
    }
  }, [search, dispatch]);

  return (
    <div
      className={`absolute inset-0 bg-black/50 flex items-center justify-center transition duration-300 ${
        isAddMembers ? 'opacity-1 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) => {
        if (
          e.target !== modalContentRef?.current &&
          !modalContentRef?.current?.contains(e.target as Node)
        )
          dispatch(setIsAddMembers(false));
      }}
    >
      <div
        ref={modalContentRef}
        className="w-[300px] h-[450px] rounded flex flex-col shadow relative dark:bg-slate-600  bg-white"
      >
        <IoIosCloseCircleOutline
          className="absolute top-4 left-4 cursor-pointer text-sky-400 text-2xl"
          onClick={() => dispatch(setIsAddMembers(false))}
        />
        <div className="py-4 flex items-center justify-center border-b border-gray-200 dark:border-gray-500 text-sm dark:text-white">
          Add Members
        </div>
        <div className="p-2">
          <div className="bg-neutral-100 dark:bg-slate-500 rounded py-1 px-2 text-sm">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none dark:text-gray-200 dark:placeholder:text-gray-200"
            />
          </div>
        </div>
        {users &&
          users
            .filter(
              (user) => !selectedChat?.users.map((u) => u.id).includes(user.id)
            )
            .map((user) => (
              <CreateChatUser
                key={user.id}
                onAddMembers
                onChatInfo
                noOnline
                user={user}
              />
            ))}
      </div>
    </div>
  );
};

export default AddMembersModal;
