"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const bs_1 = require("react-icons/bs");
const hooks_1 = require("../app/hooks");
const app_1 = require("../features/app/app");
const chat_1 = require("../features/chat/chat");
const users_1 = require("../features/users/users");
const HandleMemberModal = ({ socket }) => {
    const modalContentRef = (0, react_1.useRef)(null);
    const { isHandleMember, action } = (0, hooks_1.useAppSelector)((state) => state.app);
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const { selectedChat } = (0, hooks_1.useAppSelector)((state) => state.chat);
    const { selectedUser } = (0, hooks_1.useAppSelector)((state) => state.users);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const handleAddUser = () => {
        var _a, _b;
        dispatch((0, chat_1.sendMessage)({
            chatId: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id,
            content: `Added ${selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.username} to chat.`,
        }));
        dispatch((0, chat_1.addToGroupChat)());
        (_a = socket === null || socket === void 0 ? void 0 : socket.current) === null || _a === void 0 ? void 0 : _a.emit('sendMessage', {
            sender: user,
            chat: {
                users: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users,
            },
        });
        (_b = socket === null || socket === void 0 ? void 0 : socket.current) === null || _b === void 0 ? void 0 : _b.emit('refetchChats', selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id);
        dispatch((0, users_1.setSelectedUser)(null));
        dispatch((0, app_1.setIsHandleMember)(false));
    };
    const handleLeave = () => {
        var _a;
        dispatch((0, chat_1.sendMessage)({
            chatId: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id,
            content: `Left the chat.`,
        }));
        dispatch((0, chat_1.leaveGroupChat)());
        (_a = socket === null || socket === void 0 ? void 0 : socket.current) === null || _a === void 0 ? void 0 : _a.emit('sendMessage', {
            sender: user,
            chat: {
                users: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users,
            },
        });
        dispatch((0, app_1.setIsHandleMember)(false));
    };
    const handleRemoveUser = () => {
        var _a, _b;
        dispatch((0, chat_1.sendMessage)({
            chatId: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id,
            content: `Removed ${selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.username} from chat.`,
        }));
        dispatch((0, chat_1.removeFromGroupChat)());
        (_a = socket === null || socket === void 0 ? void 0 : socket.current) === null || _a === void 0 ? void 0 : _a.emit('sendMessage', {
            sender: user,
            chat: {
                users: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users,
            },
        });
        (_b = socket === null || socket === void 0 ? void 0 : socket.current) === null || _b === void 0 ? void 0 : _b.emit('refetchChats', selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.id);
        dispatch((0, users_1.setSelectedUser)(null));
        dispatch((0, app_1.setIsHandleMember)(false));
    };
    return (<div className={`absolute z-10 inset-0 bg-black/50 flex items-center justify-center transition duration-300 ${isHandleMember ? 'opacity-1 visible' : 'opacity-0 invisible'}`} onClick={(e) => {
            var _a;
            if (e.target !== (modalContentRef === null || modalContentRef === void 0 ? void 0 : modalContentRef.current) &&
                !((_a = modalContentRef === null || modalContentRef === void 0 ? void 0 : modalContentRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)))
                dispatch((0, app_1.setIsHandleMember)(false));
        }}>
      <div ref={modalContentRef} className="w-[250px] h-[200px] p-4 rounded-lg flex flex-col shadow relative dark:bg-slate-700 dark:border dark:border-gray-500  bg-stone-100 items-center ">
        <div className="p-1 mt-2 bg-white flex text-4xl items-center justify-center text-sky-400 border rounded-xl shadow border-gray-200">
          <bs_1.BsTelegram />
        </div>
        <h1 className="mt-6 text-black dark:text-white font-semibold text-xs">
          Telegram
        </h1>
        <p className="mt-2 text-xs dark:text-gray-200">
          {action === 'ADD' ? (<span>Add {selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.username} to chat?</span>) : action === 'REMOVE' ? (<span>Sure to remove {selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.username} from chat?</span>) : (<span>Sure to leave the chat?</span>)}
        </p>
        <div className="mt-4 w-full flex items-center gap-2">
          <button className="text-xs w-full bg-white dark:bg-stone-400 dark:border-none py-1 px-4 border border-gray-200 dark:text-white rounded shadow" onClick={() => {
            dispatch((0, users_1.setSelectedUser)(null));
            dispatch((0, app_1.setIsHandleMember)(false));
        }}>
            Cancel
          </button>
          <button className="text-xs text-white  bg-blue-500 border-blue-500 w-full py-1 px-4  rounded shadow" onClick={() => action === 'ADD'
            ? handleAddUser()
            : action === 'REMOVE'
                ? handleRemoveUser()
                : handleLeave()}>
            {action === 'ADD'
            ? 'Add'
            : action === 'REMOVE'
                ? 'Remove'
                : 'Leave'}
          </button>
        </div>
      </div>
    </div>);
};
exports.default = HandleMemberModal;
