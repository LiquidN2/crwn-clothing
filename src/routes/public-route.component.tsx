import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import type { UserDoc } from '../models/User';

interface PublicRouteProps {
  currentUser: UserDoc | null;
  children: JSX.Element;
}

const PublicRoute = ({ currentUser, children }: PublicRouteProps) => {
  const location = useLocation();

  return currentUser ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    children
  );
};

export default PublicRoute;
