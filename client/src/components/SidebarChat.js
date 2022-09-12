"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../utils/chat");
const hooks_1 = require("../app/hooks");
const chat_2 = require("../features/chat/chat");
const date_fns_1 = require("date-fns");
const _1 = require("./");
const app_1 = require("../features/app/app");
const SidebarChat = ({ chat, socket }) => {
    var _a, _b, _c;
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const { selectedChat } = (0, hooks_1.useAppSelector)((state) => state.chat);
    const { onlineUsers } = (0, hooks_1.useAppSelector)((state) => state.users);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const sender = (0, chat_1.getSenderFull)(user, chat.users);
    const chatName = chat.is_group_chat ? chat.chat_name : sender.username;
    const image_url = chat.is_group_chat ? chat.image_url : sender.image_url;
    return (<div className={`w-full p-2 flex gap-2 cursor-pointer hover:bg-stone-50 dark:hover:bg-slate-500 ${(selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id) === chat.id &&
            'bg-sky-400 dark:bg-slate-500 hover:bg-sky-400 dark:hover:bg-slate-500 text-white '}`} onClick={() => {
            var _a;
            dispatch((0, chat_2.setSelectedChat)(chat));
            dispatch((0, chat_2.setCreateChat)(false));
            dispatch((0, chat_2.setIsChatInfo)(false));
            dispatch((0, app_1.setIsEditGroupChat)(false));
            (_a = socket === null || socket === void 0 ? void 0 : socket.current) === null || _a === void 0 ? void 0 : _a.emit('joinChat', chat.id);
        }}>
      <div className="relative">
        {chat.is_group_chat ? (<_1.Avatar letter={chatName[0]} image_url={image_url}/>) : (<>
            <_1.Avatar letter={sender.username[0]} image_url={image_url}/>
            {onlineUsers.map((user) => user.id).includes(sender.id) && (<span className="bottom-0 left-8 absolute  w-3 h-3 bg-white border-2 border-sky-400 dark:border-gray-800 rounded-full"></span>)}
          </>)}
      </div>

      <div className="overflow-hidden w-full py-[2px]">
        <h1 className="text-xs capitalize font-medium flex  items-center">
          <span className="box w-[35%] dark:text-white">{chatName}</span>
          <span className={`text-[10px] w-[65%] flex justify-end ${(selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id) === chat.id
            ? 'text-white dark:text-gray-300'
            : 'text-gray-400'}`}>
            {((_a = chat === null || chat === void 0 ? void 0 : chat.latest_message) === null || _a === void 0 ? void 0 : _a.created_at) &&
            (0, date_fns_1.formatDistanceToNow)(new Date((_b = chat === null || chat === void 0 ? void 0 : chat.latest_message) === null || _b === void 0 ? void 0 : _b.created_at), {
                addSuffix: true,
            })}
          </span>
        </h1>
        <p className={`text-xs box ${(selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.id) === chat.id
            ? 'text-white dark:text-gray-300'
            : 'text-gray-400'}`}>
          {(_c = chat === null || chat === void 0 ? void 0 : chat.latest_message) === null || _c === void 0 ? void 0 : _c.content}
        </p>
      </div>
    </div>);
};
exports.default = SidebarChat;
