"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const date_fns_1 = require("date-fns");
const hooks_1 = require("../app/hooks");
const _1 = require(".");
const users_1 = require("../features/users/users");
const chat_1 = require("../features/chat/chat");
const User = ({ user, socket, contacts }) => {
    const [selected, setSelected] = (0, react_1.useState)(false);
    const { onlineUsers, selectedUsers } = (0, hooks_1.useAppSelector)((state) => state.users);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        setSelected(selectedUsers.map((u) => u.id).includes(user.id));
    }, [selectedUsers, user.id]);
    return (<div className="w-full p-2 flex gap-2 cursor-pointer hover:bg-stone-50 dark:hover:bg-slate-500" onClick={() => {
            var _a;
            if (contacts) {
                dispatch((0, chat_1.accessChat)(user.id));
                dispatch((0, chat_1.setCreateChat)(false));
                dispatch((0, users_1.resetSelectedUsers)());
                dispatch((0, chat_1.setIsChatInfo)(false));
                navigate('/messanger');
                (_a = socket === null || socket === void 0 ? void 0 : socket.current) === null || _a === void 0 ? void 0 : _a.emit('refetchChats', user.id);
            }
            else {
                if (selected) {
                    dispatch((0, users_1.removeSelectedUser)(user));
                }
                else {
                    dispatch((0, users_1.addSelectedUser)(user));
                }
            }
        }}>
      <div className="relative">
        <_1.Avatar letter={user.username[0]} image_url={user === null || user === void 0 ? void 0 : user.image_url}/>
        {onlineUsers.map((user) => user.id).includes(user.id) && (<span className="bottom-0 left-8 absolute  w-3 h-3 bg-white border-2 border-sky-400 dark:border-gray-800 rounded-full"></span>)}
      </div>
      <div className="overflow-hidden w-full py-[2px] flex flex-col justify-center">
        <h1 className="text-xs capitalize font-medium flex  justify-between items-center dark:text-white">
          {user.username}{' '}
        </h1>
        <p className={'text-xs w-full'}>
          {onlineUsers.map((user) => user.id).includes(user.id) ? (<span className="text-sky-400">Online</span>) : (user === null || user === void 0 ? void 0 : user.last_online) ? (<span className="text-gray-400">
              last seen{' '}
              {(0, date_fns_1.formatDistanceToNow)(Number(user === null || user === void 0 ? void 0 : user.last_online), {
                addSuffix: true,
            })}
            </span>) : (<span className="text-gray-400">last seen 5 minutes ago</span>)}
        </p>
      </div>
      {!contacts && (<div className="flex items-center">
          <div className={`bg-gray-100 dark:bg-transparent dark:border dark:border-white rounded-full cursor-pointer flex items-center justify-center w-5 h-5 ${selected
                ? 'bg-sky-400 dark:bg-sky-400 text-white'
                : 'shadow-inner'}`}>
            {selected && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
              </svg>)}
          </div>
        </div>)}
    </div>);
};
exports.default = User;
