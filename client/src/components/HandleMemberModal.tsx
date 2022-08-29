import { useRef } from 'react';
import { BsTelegram } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setIsHandleMember } from '../features/app/app';
import { setSelectedUser } from '../features/users/users';

const HandleMemberModal = () => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const { isHandleMember, action } = useAppSelector((state) => state.app);

  const { selectedUser } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

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
        className="w-[250px] h-[200px] p-4 rounded-lg flex flex-col shadow relative dark:bg-slate-600  bg-stone-100 items-center "
      >
        <div className="p-1 mt-2 bg-white flex text-4xl items-center justify-center text-sky-400 border rounded-xl shadow border-gray-200">
          <BsTelegram />
        </div>
        <h1 className="mt-6 text-black dark:text-white font-semibold text-xs">
          Telegram
        </h1>
        <p className="mt-2 text-xs">
          Add "<span className="capitalize">{selectedUser?.username}</span>" to
          the group?
        </p>
        <div className="mt-4 w-full flex items-center gap-2">
          <button
            className="text-xs w-full bg-white py-1 px-4 border border-gray-200 rounded shadow"
            onClick={() => {
              dispatch(setSelectedUser(null));
              dispatch(setIsHandleMember(false));
            }}
          >
            Cancel
          </button>
          <button className="text-xs text-white  bg-blue-500 border-blue-500 w-full py-1 px-4  rounded shadow">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandleMemberModal;
