import { Routes, Route } from 'react-router-dom';

import { Home, Login, Register, Messanger } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/messanger" element={<Messanger />} />
    </Routes>
  );
};

export default App;
