import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import { ProtectedRoute } from './components';
import { Home, Login, Register, Messanger } from './pages';
import { useAppDispatch } from './app/hooks';
import { init } from './features/auth/auth';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/messanger"
        element={
          <ProtectedRoute>
            <Messanger />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
