import { createContext, useState, useEffect } from 'react';
import { post } from 'axios';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, userSet] = useState(null);
  const [error, errorSet] = useState(null);
  const router = useRouter();

  const register = async (user) => {
    try {
      const { data } = await post(`${NEXT_URL}/api/register`, user);
      userSet(data.user);
      router.push('/account/dashboard');
    } catch (error){
      errorSet(error.response.message);
      errorSet(null);
    }
  };

  const login = async ({ email: identifier, password }) => {
    try {
      const { data } = await post(`${NEXT_URL}/api/login`, { identifier, password });
      userSet(data.user);
      router.push('/account/dashboard');
    } catch (error){
      errorSet(error.response.message);
      errorSet(null);
    }
  };

  const logout = async () => {
    try {
      await post(`${NEXT_URL}/api/logout`);
      userSet(null);
      router.push('/');
    } catch (error){
      errorSet(error.response.message);
      errorSet(null);
    }
  };

  const checkUserLoggedIn = async () => {
    // try {
    //   const { data } = await post(`${NEXT_URL}/api/user`);
    //   userSet(data.user);
    // } catch (error){
    //   userSet(null);
    //   errorSet(error.response.message);
    //   errorSet(null);
    // }

    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      userSet(data.user);
    } else {
      userSet(null);
    }
  };

  useEffect(() => checkUserLoggedIn(), []);

  return <AuthContext.Provider value={{ user, error, login, logout, register }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

// const res = await fetch(`${NEXT_URL}/api/register`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(user)
// });
// const data = await res.json();

// if (res.ok) {
//   userSet(data.user);
//   router.push('/account/dashboard');
// } else {
//   errorSet(data.message);
//   errorSet(null);
// }

// const res = await fetch(`${NEXT_URL}/api/login`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ identifier, password })
// });
// const data = await res.json();

// if (res.ok) {
//   userSet(data.user);
//   router.push('/account/dashboard');
// } else {
//   errorSet(data.message);
//   errorSet(null);
// }

// const res = await fetch(`${NEXT_URL}/api/logout`, {
//   method: 'POST'
// });

// if (res.ok) {
//   userSet(null);
//   router.push('/');
// }
