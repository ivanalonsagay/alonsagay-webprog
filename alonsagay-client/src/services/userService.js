import axios from 'axios';

import { API_BASE_URL, getToken } from '../constants';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message || 'Something went wrong.';
};

const UserService = {
  async register(payload) {
    try {
      const response = await api.post('/users/register', payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async login(payload) {
    try {
      const response = await api.post('/users/login', payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async getUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async createUser(payload) {
    try {
      const response = await api.post('/users', payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async updateUser(id, payload) {
    try {
      const response = await api.put(`/users/${id}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  async toggleUserStatus(id) {
    try {
      const response = await api.patch(`/users/${id}/status`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default UserService;