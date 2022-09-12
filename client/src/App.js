"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const axios_1 = __importDefault(require("axios"));
const components_1 = require("./components");
const pages_1 = require("./pages");
const hooks_1 = require("./app/hooks");
const auth_1 = require("./features/auth/auth");
const chat_1 = require("./features/chat/chat");
const users_1 = require("./features/users/users");
axios_1.default.defaults.baseURL = '/api';
axios_1.default.defaults.withCredentials = true;
const App = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, auth_1.init)());
    }, [dispatch]);
    (0, react_1.useEffect)(() => {
        const update = () => {
            dispatch((0, auth_1.updateOnline)(new Date().getTime()));
        };
        window.addEventListener('beforeunload', update);
        return () => window.removeEventListener('beforeunload', update);
    }, [dispatch]);
    const { user } = (0, hooks_1.useAppSelector)((state) => state.auth);
    const { isDarkMode } = (0, hooks_1.useAppSelector)((state) => state.app);
    const socket = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (user) {
            socket.current = (0, socket_io_client_1.io)();
            socket.current.emit('setup', user.id);
            socket.current.emit('addUser', user.id);
            socket.current.on('getUsers', (users) => {
                dispatch((0, users_1.setOnlineUsers)(users));
            });
            socket.current.on('messageReceived', () => {
                dispatch((0, chat_1.toggleRefetch)());
            });
        }
    }, [user, dispatch]);
    return (<div className={isDarkMode ? 'dark' : ''}>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<pages_1.Home />}/>
        <react_router_dom_1.Route path="/login" element={<pages_1.Login />}/>
        <react_router_dom_1.Route path="/register" element={<pages_1.Register />}/>
        <react_router_dom_1.Route path="/messanger" element={<components_1.ProtectedRoute>
              <components_1.MessangerLayout />
            </components_1.ProtectedRoute>}>
          <react_router_dom_1.Route index element={<pages_1.Messanger socket={socket}/>}/>
          <react_router_dom_1.Route path="/messanger/contacts" element={<>
                <components_1.SidebarContacts socket={socket}/>
                <components_1.Chat socket={socket}/>
              </>}/>
          <react_router_dom_1.Route path="/messanger/settings" element={<>
                <components_1.SidebarSettings />
                <components_1.Settings />
              </>}/>
        </react_router_dom_1.Route>
      </react_router_dom_1.Routes>
    </div>);
};
exports.default = App;
