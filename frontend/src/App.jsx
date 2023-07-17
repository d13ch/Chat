import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
          )}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </AuthProvider>
);

export default App;
