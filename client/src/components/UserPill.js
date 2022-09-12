"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../app/hooks");
const users_1 = require("../features/users/users");
const UserPill = ({ user }) => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    return (<div className="bg-sky-400 dark:bg-sky-500 cursor-pointer capitalize text-white rounded text-xs py-[2px] px-1 flex items-center gap-1" onClick={() => dispatch((0, users_1.removeSelectedUser)(user))}>
      {user.username}
      <div className="w-3 h-3 flex rounded-full items-center justify-center bg-sky-100 text-sky-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </div>
    </div>);
};
exports.default = UserPill;
