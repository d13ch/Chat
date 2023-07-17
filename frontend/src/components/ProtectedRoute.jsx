import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  const location = useLocation();

  return (
    loggedIn
      ? children
      : <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
