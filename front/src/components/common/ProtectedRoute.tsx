import React from 'react';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: User | null;
  requiredRole?: string;
}

interface User {
  id: string;
  role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, user, requiredRole }) => {
  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
