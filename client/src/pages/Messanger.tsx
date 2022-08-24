import { Link } from 'react-router-dom';

import { logout } from '../features/auth/auth';
import { useAppDispatch } from '../app/hooks';

const Messanger = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      Messanger
      <Link to="/login">Login</Link>
      <Link to="/register">Sign Up</Link>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};

export default Messanger;
