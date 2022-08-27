import { Socket } from 'socket.io-client';
import { useRef, useEffect, useState } from 'react';

import {
  createGroupChat,
  setCreateChat,
  setCreateChatName,
} from '../features/chat/chat';
import {
  searchUsers,
  resetSearchUsers,
  resetSelectedUsers,
} from '../features/users/users';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ServerToClientEvents, ClientToServerEvents } from '../interfaces';
import { User, UserPill, Avatar, CreateChatUser } from './';

interface CreateChatProps {
  socket: React.MutableRefObject<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>;
}

const CreateChat: React.FC<CreateChatProps> = ({ socket }) => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  const { searchUsers: users, selectedUsers } = useAppSelector(
    (state) => state.users
  );

  const { user } = useAppSelector((state) => state.auth);

  const { createChatName } = useAppSelector((state) => state.chat);

  const [search, setSearch] = useState('');

  const [chatName, setChatName] = useState('');

  useEffect(() => {
    if (search.trim()) {
      dispatch(searchUsers(search));
    } else {
      dispatch(resetSearchUsers());
    }
  }, [search, dispatch]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full border-b border-gray-200 py-4 px-4 flex items-center justify-between text-sm">
        <div
          className="text-sky-400 cursor-pointer flex items-center"
          onClick={() => {
            if (createChatName) {
              dispatch(setCreateChatName(false));
            } else {
              dispatch(setCreateChat(false));
              dispatch(resetSelectedUsers());
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </div>
        <div>
          {createChatName ? (
            <>New Group</>
          ) : (
            <>
              Select users{' '}
              <span className="inline-block ml-1 text-gray-400">
                {selectedUsers.length}/200 000
              </span>
            </>
          )}
        </div>
        <button
          className="disabled:text-gray-400 text-sky-400"
          disabled={selectedUsers.length === 0}
          onClick={() => {
            if (!createChatName) {
              dispatch(setCreateChatName(true));
            } else {
              dispatch(createGroupChat(chatName ? chatName : 'New Group'));
              dispatch(resetSearchUsers());
              dispatch(resetSelectedUsers());
              setChatName('');
              setSearch('');
              socket?.current?.emit('sendMessage', {
                sender: user,
                chat: {
                  users: selectedUsers,
                },
              });
            }
          }}
        >
          {createChatName ? 'Create' : 'Next'}
        </button>
      </div>
      {createChatName ? (
        <div className="bg-stone-100 w-full h-full ">
          <div className="flex flex-col items-center max-w-[400px] mx-auto overflow-y-scroll">
            <div className="bg-white mt-8 w-full rounded flex items-center gap-2 px-4 py-2 shadow">
              <Avatar letter={!chatName ? 'N' : chatName[0]} />
              <input
                type="text"
                value={chatName}
                className="outline-none text-sm"
                placeholder="Group Name"
                onChange={(e) => setChatName(e.target.value)}
              />
            </div>
            <div className="w-full h-full mt-8 flex flex-col gap-2">
              {selectedUsers.map((u) => (
                <CreateChatUser key={u.id} user={u} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="py-2 px-3 w-full border-b border-gray-200">
            <div className="bg-stone-100 rounded-lg w-full text-sm px-2 py-1 flex items-center gap-1 overflow-x-scroll">
              {selectedUsers.map((u) => (
                <UserPill key={u.id} user={u} />
              ))}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={inputRef}
                className="outline-none w-full bg-transparent"
                placeholder="Who would you like to add?"
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col overflow-y-scroll">
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateChat;
