"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const emoji_picker_react_1 = __importDefault(require("emoji-picker-react"));
const date_fns_1 = require("date-fns");
const hooks_1 = require("../app/hooks");
const chat_1 = require("../features/chat/chat");
const chat_2 = require("../utils/chat");
const _1 = require("./");
const Chat = ({ socket }) => {
    var _a, _b;
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { selectedChat: chat, messages, refetch, isChatInfo, } = (0, hooks_1.useAppSelector)((state) => state.chat);
    const { onlineUsers } = (0, hooks_1.useAppSelector)((state) => state.users);
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const inputRef = (0, react_1.useRef)(null);
    const [content, setContent] = (0, react_1.useState)('');
    const [showPicker, setShowPicker] = (0, react_1.useState)(false);
    const emojiRef = (0, react_1.useRef)(null);
    const onEmojiClick = (event, emojiObject) => {
        setContent(content + emojiObject.emoji);
    };
    (0, react_1.useEffect)(() => {
        const clickOutside = (e) => {
            var _a;
            if (e.target !== emojiRef.current &&
                !((_a = emojiRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                setShowPicker(false);
            }
        };
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);
    const handleSubmit = (e) => {
        var _a;
        e.preventDefault();
        dispatch((0, chat_1.sendMessage)({
            chatId: chat === null || chat === void 0 ? void 0 : chat.id,
            content,
        }));
        setContent('');
        (_a = socket === null || socket === void 0 ? void 0 : socket.current) === null || _a === void 0 ? void 0 : _a.emit('sendMessage', {
            content,
            chat,
            sender: user,
        });
    };
    (0, react_1.useEffect)(() => {
        var _a;
        if (chat) {
            dispatch((0, chat_1.fetchMessages)(chat));
            (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [chat, dispatch, refetch]);
    const sender = chat && (0, chat_2.getSenderFull)(user, chat === null || chat === void 0 ? void 0 : chat.users);
    const chatName = chat && (chat === null || chat === void 0 ? void 0 : chat.is_group_chat) ? chat === null || chat === void 0 ? void 0 : chat.chat_name : sender === null || sender === void 0 ? void 0 : sender.username;
    const image_url = chat && (chat === null || chat === void 0 ? void 0 : chat.is_group_chat) ? chat === null || chat === void 0 ? void 0 : chat.image_url : sender === null || sender === void 0 ? void 0 : sender.image_url;
    return (<div className={`${!chat &&
            !isChatInfo &&
            'bg-neutral-100 dark:bg-slate-600 flex items-center justify-center'} w-full`}>
      {!chat && !isChatInfo && (<span className="py-1 px-2 text-sm text-gray-400 dark:text-gray-300 bg-white dark:bg-slate-500 rounded-[30px]">
          Select chat to start messaging
        </span>)}
      {chat && !isChatInfo ? (<div className="h-full flex flex-col">
          <div className="py-1 px-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-500 dark:bg-slate-600">
            {/* @ts-ignore */}
            <_1.Avatar letter={chatName && chatName[0]} image_url={image_url}/>
            <div className="flex flex-col justify-center">
              <h1 className="text-xs text-medium capitalize dark:text-white">
                {chatName}
              </h1>
              {(chat === null || chat === void 0 ? void 0 : chat.is_group_chat) ? (<div className="flex items-center">
                  <p className="text-xs text-gray-400">
                    {(_a = chat === null || chat === void 0 ? void 0 : chat.users) === null || _a === void 0 ? void 0 : _a.length} members
                  </p>
                  <p className="ml-1 text-xs text-sky-400">
                    {(_b = chat === null || chat === void 0 ? void 0 : chat.users) === null || _b === void 0 ? void 0 : _b.filter((user) => onlineUsers.map((u) => u.id).includes(user.id)).length}{' '}
                    online
                  </p>
                </div>) : onlineUsers.map((user) => user.id).includes(sender === null || sender === void 0 ? void 0 : sender.id) ? (<p className="text-xs text-sky-400">online</p>) : (sender === null || sender === void 0 ? void 0 : sender.last_online) ? (<p className="text-xs text-gray-400">
                  last seen{' '}
                  {(0, date_fns_1.formatDistanceToNow)(Number(sender === null || sender === void 0 ? void 0 : sender.last_online), {
                    addSuffix: true,
                })}
                </p>) : (<p className="text-xs text-gray-400">last seen 5 minutes ago</p>)}
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sky-400 cursor-pointer transition duration-300 hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sky-400 cursor-pointer transition duration-300 hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => {
                if (chat.is_group_chat) {
                    dispatch((0, chat_1.setIsChatInfo)(true));
                }
            }} className="w-6 h-6 text-sky-400 cursor-pointer transition duration-300 hover:scale-110">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
              </svg>
            </div>
          </div>
          <div className="w-full h-full flex flex-col-reverse px-4 pb-4 overflow-y-scroll dark:bg-slate-600">
            {messages &&
                messages.map((m, index) => {
                    return (<_1.Message isNewMessage={(0, chat_2.isNewMessage)(messages, m, index)} key={m.id} message={m}/>);
                })}
          </div>
          <form className="relative mt-auto flex items-center gap-4 py-3 px-4 border-t border-gray-200 dark:border-gray-500 dark:bg-slate-600" onSubmit={handleSubmit}>
            {showPicker && (<div className="absolute
              -top-[630%] right-16">
                <emoji_picker_react_1.default onEmojiClick={onEmojiClick}/>
              </div>)}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 cursor-pointer text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"/>
            </svg>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} ref={inputRef} placeholder="Write a message" className="rounded text-gray-700 dark:text-gray-300 bg-transparent  px-2  placeholder:text-gray-300  w-full outline-none"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" ref={emojiRef} onClick={() => setShowPicker(!showPicker)} strokeWidth={1.5} stroke="currentColor" className="block ml-auto w-7 h-7 cursor-pointer text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
            </svg>
          </form>
        </div>) : (chat && isChatInfo && <_1.ChatInfo socket={socket}/>)}
    </div>);
};
exports.default = Chat;
