const constants = {
  HOST: `${process.env.VITE_API_BASE_URL}/api`,
};

const AUTH_TOKEN_KEY = 'ivankaAuthToken';
const AUTH_USER_KEY = 'ivankaAuthUser';

export const saveAuth = ({ token, user }) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

  localStorage.setItem(
    'user',
    JSON.stringify({
      ...user,
      token,
    })
  );
};

export const getToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    return token;
  }

  try {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    return savedUser?.token || null;
  } catch {
    return null;
  }
};

export const getCurrentUser = () => {
  try {
    const savedUser = localStorage.getItem(AUTH_USER_KEY);

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    const oldUser = localStorage.getItem('user');

    if (oldUser) {
      return JSON.parse(oldUser);
    }

    return null;
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem('user');
};

export default constants;