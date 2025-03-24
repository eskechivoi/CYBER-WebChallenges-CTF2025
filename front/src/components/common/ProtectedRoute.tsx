// ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { JSX } from 'react';

const ProtectedRoute: React.FC<{ 
  children: JSX.Element, 
  requiredRole?: string 
}> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <Navigate 
        to="/" 
        replace 
        state={{ 
          error: "No tienes permisos para acceder a esta página" 
        }} 
      />
    );
  }

  return children;
};

export default ProtectedRoute;
