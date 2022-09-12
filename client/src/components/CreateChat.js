"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const chat_1 = require("../features/chat/chat");
const users_1 = require("../features/users/users");
const hooks_1 = require("../app/hooks");
const _1 = require("./");
const CreateChat = ({ socket }) => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, []);
    const { searchUsers: users, selectedUsers } = (0, hooks_1.useAppSelector)((state) => state.users);
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const { createChatName } = (0, hooks_1.useAppSelector)((state) => state.chat);
    const [search, setSearch] = (0, react_1.useState)('');
    const [chatName, setChatName] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (search.trim()) {
            dispatch((0, users_1.searchUsers)(search));
        }
        else {
            dispatch((0, users_1.resetSearchUsers)());
        }
    }, [search, dispatch]);
    return (<div className="w-full flex flex-col">
      <div className="w-full border-b border-gray-200 dark:border-gray-500 py-4 px-4 flex items-center justify-between text-sm dark:bg-slate-600">
        <div className="text-sky-400 cursor-pointer flex items-center" onClick={() => {
            if (createChatName) {
                dispatch((0, chat_1.setCreateChatName)(false));
            }
            else {
                dispatch((0, chat_1.setCreateChat)(false));
                dispatch((0, users_1.resetSelectedUsers)());
            }
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
          </svg>
          Back
        </div>
        <div>
          {createChatName ? (<span className="dark:text-white">New Group</span>) : (<>
              <span className="dark:text-white">Select users </span>
              <span className="inline-block ml-1 text-gray-400 dark:text-gray-400">
                {selectedUsers.length}/200 000
              </span>
            </>)}
        </div>
        <button className="disabled:text-gray-400 dark:disabled:text-gray-400 text-sky-400 dark:text-sky-400" disabled={selectedUsers.length === 0} onClick={() => {
            var _a;
            if (!createChatName) {
                dispatch((0, chat_1.setCreateChatName)(true));
            }
            else {
                dispatch((0, chat_1.createGroupChat)(chatName ? chatName : 'New Group'));
                dispatch((0, users_1.resetSearchUsers)());
                dispatch((0, users_1.resetSelectedUsers)());
                setChatName('');
                setSearch('');
                (_a = socket === null || socket === void 0 ? void 0 : socket.current) === null || _a === void 0 ? void 0 : _a.emit('sendMessage', {
                    sender: user,
                    chat: {
                        users: selectedUsers,
                    },
                });
            }
        }}>
          {createChatName ? 'Create' : 'Next'}
        </button>
      </div>
      {createChatName ? (<div className="bg-stone-100 dark:bg-slate-600 w-full h-full ">
          <div className="flex flex-col items-center max-w-[400px] mx-auto overflow-y-scroll">
            <div className="bg-white dark:bg-slate-500 mt-8 w-full rounded flex items-center gap-2 px-4 py-2 shadow">
              <_1.Avatar letter={!chatName ? 'N' : chatName[0]}/>
              <input type="text" value={chatName} className="outline-none text-sm dark:placeholder:text-gray-300 dark:bg-transparent dark:text-gray-300" placeholder="Group Name" onChange={(e) => setChatName(e.target.value)}/>
            </div>
            <div className="w-full h-full mt-8 flex flex-col gap-2">
              {selectedUsers.map((u) => (<_1.CreateChatUser key={u.id} user={u}/>))}
            </div>
          </div>
        </div>) : (<>
          <div className="py-2 px-3 w-full border-b border-gray-200 dark:border-gray-500 dark:bg-slate-600">
            <div className="bg-stone-100 dark:bg-slate-500 rounded-lg w-full text-sm px-2 py-1 flex items-center gap-1 overflow-x-scroll">
              {selectedUsers.map((u) => (<_1.UserPill key={u.id} user={u}/>))}
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} ref={inputRef} className="outline-none w-full bg-transparent dark:text-gray-300" placeholder="Who would you like to add?"/>
            </div>
          </div>
          <div className="w-full h-full dark:bg-slate-600 flex flex-col overflow-y-scroll">
            {users.map((user) => (<_1.User key={user.id} user={user}/>))}
          </div>
        </>)}
    </div>);
};
exports.default = CreateChat;
