import axios from 'axios';

import constants, { getToken } from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const normalizeUser = (user) => {
  return {
    ...user,
    id: user.id || user._id,
  };
};

const normalizeResponse = (response) => {
  const data = response.data;

  if (Array.isArray(data)) {
    return data.map(normalizeUser);
  }

  if (Array.isArray(data.users)) {
    return data.users.map(normalizeUser);
  }

  if (Array.isArray(data.data)) {
    return data.data.map(normalizeUser);
  }

  if (data.user) {
    return normalizeUser(data.user);
  }

  return data;
};

const getUsers = async () => {
  try {
    const response = await API.get('/');

    return normalizeResponse(response);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to fetch users.'));
  }
};

const createUser = async (user) => {
  try {
    const response = await API.post('/', user);

    return normalizeResponse(response);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to create user.'));
  }
};

const register = async (user) => {
  try {
    const response = await API.post('/register', user);

    return normalizeResponse(response);
  } catch (error) {
    try {
      const response = await API.post('/', user);

      return normalizeResponse(response);
    } catch (secondError) {
      throw new Error(
        getErrorMessage(secondError, 'Unable to register account.')
      );
    }
  }
};

const updateUser = async (id, user) => {
  try {
    const response = await API.put(`/${id}`, user);

    return normalizeResponse(response);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to update user.'));
  }
};

const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/${id}`);

    return normalizeResponse(response);
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to delete user.'));
  }
};

const toggleUserStatus = async (id) => {
  try {
    const response = await API.patch(`/${id}/status`);

    return normalizeResponse(response);
  } catch (error) {
    try {
      const users = await getUsers();
      const user = users.find((item) => item.id === id);

      const response = await API.put(`/${id}`, {
        ...user,
        isActive: !user.isActive,
      });

      return normalizeResponse(response);
    } catch {
      throw new Error(getErrorMessage(error, 'Unable to update user status.'));
    }
  }
};

const login = async (credentials) => {
  try {
    const response = await API.post('/login', credentials);

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Invalid username or password.'));
  }
};

const UserService = {
  getUsers,
  createUser,
  register,
  updateUser,
  deleteUser,
  toggleUserStatus,
  login,
};

export default UserService;