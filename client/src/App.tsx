import { Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import axios from 'axios';

import {
  ProtectedRoute,
  Chat,
  MessangerLayout,
  SidebarContacts,
  SidebarSettings,
  Settings,
} from './components';
import { Home, Login, Register, Messanger } from './pages';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ServerToClientEvents, ClientToServerEvents } from './interfaces';
import { init, updateOnline } from './features/auth/auth';
import { toggleRefetch } from './features/chat/chat';
import { setOnlineUsers } from './features/users/users';

axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  useEffect(() => {
    const update = () => {
      dispatch(updateOnline(new Date().getTime()));
    };

    window.addEventListener('beforeunload', update);

    return () => window.removeEventListener('beforeunload', update);
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.auth);

  const { isDarkMode } = useAppSelector((state) => state.app);

  const socket = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    if (user) {
      socket.current = io();

      socket.current.emit('setup', user.id);

      socket.current.emit('addUser', user.id);

      socket.current.on('getUsers', (users) => {
        dispatch(setOnlineUsers(users));
      });

      socket.current.on('messageReceived', () => {
        dispatch(toggleRefetch());
      });
    }
  }, [user, dispatch]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/messanger"
          element={
            <ProtectedRoute>
              <MessangerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Messanger socket={socket} />} />
          <Route
            path="/messanger/contacts"
            element={
              <>
                <SidebarContacts socket={socket} />
                <Chat socket={socket} />
              </>
            }
          />
          <Route
            path="/messanger/settings"
            element={
              <>
                <SidebarSettings />
                <Settings />
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
