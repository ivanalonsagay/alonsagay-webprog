export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  } catch {
    return null;
  }
};

export const saveAuth = ({ token, user }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
};