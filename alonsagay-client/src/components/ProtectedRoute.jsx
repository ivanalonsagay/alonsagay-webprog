import { Navigate } from 'react-router-dom';

import { getCurrentUser, getToken } from '../constants';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = getToken();
  const currentUser = getCurrentUser();

  if (!token || !currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  const role = String(currentUser.role || '').toLowerCase();

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (allowedRoles.includes('admin')) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;