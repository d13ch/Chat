import React, { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

function AuthProvider({ children }) {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(!!savedUser);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const contextData = useMemo(
    () => ({ loggedIn, logIn, logOut }),
    [loggedIn, logIn, logOut],
  );

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
