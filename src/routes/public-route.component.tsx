import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { AuthStatusType, selectUserStatus } from '../redux/user';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const userStatus = useAppSelector(selectUserStatus);

  return userStatus === AuthStatusType.Authenticated ? (
    <Navigate to="/" />
  ) : (
    children
  );
};

export default PublicRoute;
