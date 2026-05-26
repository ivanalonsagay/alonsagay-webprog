import { Navigate } from 'react-router-dom';

import { getCurrentUser, getToken } from '../constants';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = getToken();
  const currentUser = getCurrentUser();

  if (!token || !currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  const userRole = String(currentUser.role || '').toLowerCase();

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;