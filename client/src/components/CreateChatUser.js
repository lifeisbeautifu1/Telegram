"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const hooks_1 = require("../app/hooks");
const _1 = require("./");
const users_1 = require("../features/users/users");
const app_1 = require("../features/app/app");
const CreateChatUser = ({ user, noOnline, onChatInfo, onAddMembers, }) => {
    var _a, _b;
    const { onlineUsers } = (0, hooks_1.useAppSelector)((state) => state.users);
    const { user: currentUser } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const { isAddMembers } = (0, hooks_1.useAppSelector)((state) => state.app);
    const { selectedChat } = (0, hooks_1.useAppSelector)((state) => state.chat);
    const dispatch = (0, hooks_1.useAppDispatch)();
    return (<div className={`w-full px-2 py-1 bg-white ${onChatInfo ? 'dark:bg-slate-600' : 'dark:bg-slate-500 rounded '}  flex  gap-2 ${onAddMembers && 'cursor-pointer'}`} onClick={() => {
            if (onAddMembers) {
                dispatch((0, users_1.setSelectedUser)(user));
                dispatch((0, app_1.setAction)('ADD'));
                dispatch((0, app_1.setIsHandleMember)(true));
            }
        }}>
      <div className="relative">
        <_1.Avatar letter={user.username[0]} image_url={user === null || user === void 0 ? void 0 : user.image_url}/>
        {onlineUsers.map((user) => user === null || user === void 0 ? void 0 : user.id).includes(user === null || user === void 0 ? void 0 : user.id) &&
            !noOnline && (<span className="bottom-0 left-8 absolute  w-3 h-3 bg-white border-2 border-sky-400 dark:border-gray-800 rounded-full"></span>)}
      </div>
      <div className={`overflow-hidden w-full py-[2px] flex   h-[44px] ${onChatInfo
            ? 'border-b border-gray-200 dark:border-gray-500 justify-between flex-row'
            : 'justify-center flex-col'}`}>
        <div>
          <h1 className="text-xs capitalize font-medium flex  justify-between items-center dark:text-white">
            {user === null || user === void 0 ? void 0 : user.username}{' '}
          </h1>
          <p className={'text-xs w-full'}>
            {onlineUsers.map((user) => user === null || user === void 0 ? void 0 : user.id).includes(user === null || user === void 0 ? void 0 : user.id) ? (<span className="text-sky-400">Online</span>) : (user === null || user === void 0 ? void 0 : user.last_online) ? (<span className="text-gray-400 dark:text-gray-300">
                last seen{' '}
                {(0, date_fns_1.formatDistanceToNow)(Number(user === null || user === void 0 ? void 0 : user.last_online), {
                addSuffix: true,
            })}
              </span>) : (<span className="text-gray-400 dark:text-gray-300">
                last seen 5 minutes ago
              </span>)}
          </p>
        </div>
        {onChatInfo && ((_a = selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.group_admin) === null || _a === void 0 ? void 0 : _a.id) === (user === null || user === void 0 ? void 0 : user.id) ? (<div className="text-xs text-gray-400 dark:text-gray-300 pt-2">
            owner
          </div>) : (onChatInfo &&
            !isAddMembers &&
            ((_b = selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.group_admin) === null || _b === void 0 ? void 0 : _b.id) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) && (<div className="text-red-500 cursor-pointer pt-2" onClick={() => {
                dispatch((0, users_1.setSelectedUser)(user));
                dispatch((0, app_1.setAction)('REMOVE'));
                dispatch((0, app_1.setIsHandleMember)(true));
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>))}
      </div>
    </div>);
};
exports.default = CreateChatUser;
