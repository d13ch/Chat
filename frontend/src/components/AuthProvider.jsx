import React, { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(!!savedUser);
  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedIn(true);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  }, []);

  const contextData = useMemo(
    () => ({ loggedIn, logIn, logOut }),
    [loggedIn, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
