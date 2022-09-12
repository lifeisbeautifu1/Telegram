"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../app/hooks");
const components_1 = require("../components");
const Messanger = ({ socket }) => {
    const { createChat } = (0, hooks_1.useAppSelector)((state) => state.chat);
    return (<div className="relative flex w-full">
      {' '}
      <components_1.Sidebar socket={socket}/>
      {createChat ? <components_1.CreateChat socket={socket}/> : <components_1.Chat socket={socket}/>}
      <components_1.AddMembersModal />
      <components_1.HandleMemberModal socket={socket}/>
    </div>);
};
exports.default = Messanger;
