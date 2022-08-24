import { useAppSelector } from '../app/hooks';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default ProtectedRoute;
