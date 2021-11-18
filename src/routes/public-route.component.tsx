import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const location = useLocation();
  const { currentUser } = useAppSelector(state => state.user);

  return currentUser ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    children
  );
};

export default PublicRoute;
