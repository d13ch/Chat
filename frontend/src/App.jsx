import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { socket } from './socket.js';
import MainPage from './components/Pages/MainPage/MainPage.jsx';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar.jsx';
import { sendMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

const App = () => {
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => dispatch(sendMessage(message)));
  socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
  socket.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, changes: name })));

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <NavBar />
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
};

export default App;
