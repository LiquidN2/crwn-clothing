import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const { currentUser } = useAppSelector(state => state.user);
  return currentUser ? <Navigate to="/" /> : children;
};

export default PublicRoute;
