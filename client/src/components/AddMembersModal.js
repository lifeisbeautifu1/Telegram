"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const io_1 = require("react-icons/io");
const hooks_1 = require("../app/hooks");
const _1 = require("./");
const app_1 = require("../features/app/app");
const users_1 = require("../features/users/users");
const AddMembersModal = () => {
    const { isAddMembers } = (0, hooks_1.useAppSelector)((state) => state.app);
    const { selectedChat } = (0, hooks_1.useAppSelector)((state) => state.chat);
    const modalContentRef = (0, react_1.useRef)(null);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { searchUsers: users } = (0, hooks_1.useAppSelector)((state) => state.users);
    const [search, setSearch] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (search.trim()) {
            dispatch((0, users_1.searchUsers)(search));
        }
        else {
            dispatch((0, users_1.resetSearchUsers)());
        }
    }, [search, dispatch]);
    return (<div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition duration-300 ${isAddMembers ? 'opacity-1 visible' : 'opacity-0 invisible'}`} onClick={(e) => {
            var _a;
            if (e.target !== (modalContentRef === null || modalContentRef === void 0 ? void 0 : modalContentRef.current) &&
                !((_a = modalContentRef === null || modalContentRef === void 0 ? void 0 : modalContentRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)))
                dispatch((0, app_1.setIsAddMembers)(false));
        }}>
      <div ref={modalContentRef} className="w-[300px] h-[450px] rounded flex flex-col shadow relative dark:bg-slate-600  bg-white">
        <io_1.IoIosCloseCircleOutline className="absolute top-4 left-4 cursor-pointer text-sky-400 text-2xl" onClick={() => dispatch((0, app_1.setIsAddMembers)(false))}/>
        <div className="py-4 flex items-center justify-center border-b border-gray-200 dark:border-gray-500 text-sm dark:text-white">
          Add Members
        </div>
        <div className="p-2">
          <div className="bg-neutral-100 dark:bg-slate-500 rounded py-1 px-2 text-sm">
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="w-full bg-transparent outline-none dark:text-gray-200 dark:placeholder:text-gray-200"/>
          </div>
        </div>
        {users &&
            users
                .filter((user) => !(selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users.map((u) => u.id).includes(user.id)))
                .map((user) => (<_1.CreateChatUser key={user.id} onAddMembers onChatInfo noOnline user={user}/>))}
      </div>
    </div>);
};
exports.default = AddMembersModal;
