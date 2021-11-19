import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectCurrentUser } from '../redux/user/user.selectors';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const currentUser = useAppSelector(selectCurrentUser);

  return currentUser ? <Navigate to="/" /> : children;
};

export default PublicRoute;
