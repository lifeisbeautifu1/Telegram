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
} from './components';
import { Home, Login, Register, Messanger } from './pages';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ServerToClientEvents, ClientToServerEvents } from './interfaces';
import { init } from './features/auth/auth';
import { toggleRefetch } from './features/chat/chat';
import { setOnlineUsers } from './features/users/users';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.auth);

  const socket = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:5000');

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
              <div className="w-full">Settings here</div>
            </>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
