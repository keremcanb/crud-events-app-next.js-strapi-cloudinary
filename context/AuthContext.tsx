import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NEXT_URL } from '@/config/index';

type ContextProps = {
  user: string;
  error: string;
  login: any;
  logout: any;
  register: any;
  checkUserLoggedIn: any;
};

const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userSet] = useState(null);
  const [error, errorSet] = useState(null);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const register = async (user) => {
    try {
      const { data } = await axios.post(`${NEXT_URL}/api/register`, user);
      userSet(data.user);
      router.push('/account/dashboard');
    } catch (err) {
      errorSet(err.response.data.message);
      errorSet(null);
    }
  };

  const login = async ({ email: identifier, password }) => {
    try {
      const { data } = await axios.post(`${NEXT_URL}/api/login`, { identifier, password });
      userSet(data.user);
      router.push('/account/dashboard');
    } catch (err) {
      errorSet(err.response.data.message);
      errorSet(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${NEXT_URL}/api/logout`);
      userSet(null);
      router.push('/');
    } catch (err) {
      errorSet(err.response.data.message);
    }
  };

  // Persist user
  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get(`${NEXT_URL}/api/user`);
      userSet(data.user);
    } catch (err) {
      userSet(null);
    }
  };

  useEffect(() => checkUserLoggedIn(), []);

  return <AuthContext.Provider value={{ user, error, login, logout, register }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
