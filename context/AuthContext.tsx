import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { NEXT_URL } from '@/config/index';

type ContextProps = {
  user: string;
  error: string;
  isLoading: boolean;
  register: (user: {}) => void;
  login: ({ email: identifier, password }) => void;
  logout: () => void;
  checkUserLoggedIn: () => void;
};

const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const register = async (user: {}) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${NEXT_URL}/api/register`, user);
      setUser(data.user);
      setIsLoading(false);
      router.push('/account/dashboard');
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      setError(null);
    }
  };

  const login = async ({ email: identifier, password }) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${NEXT_URL}/api/login`, { identifier, password });
      setUser(data.user);
      setIsLoading(false);
      router.push('/account/dashboard');
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.message);
      setError(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${NEXT_URL}/api/logout`);
      setUser(null);
      router.push('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  // Persist user
  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get(`${NEXT_URL}/api/user`);
      setUser(data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => checkUserLoggedIn(), []);

  return (
    <AuthContext.Provider value={{ user, error, isLoading, login, logout, register }} displayName="AuthContext">
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
