
import { useState, useEffect } from 'react';
import { signUp, login, logout, isLoggedIn, getLoggedInUser } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn()) {
        const user = await getLoggedInUser();
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  const signUpAndSetUser = async (username, password) => {
    await signUp(username, password);
    const user = await getLoggedInUser();
    setUser(user);
  };

  const loginAndSetUser = async (username, password) => {
    await login(username, password);
    const user = await getLoggedInUser();
    setUser(user);
  };

  const logoutAndClearUser = () => {
    logout();
    setUser(null);
  };

  return {
    user,
    signUp: signUpAndSetUser,
    login: loginAndSetUser,
    logout: logoutAndClearUser,
    isLoggedIn
  };
}