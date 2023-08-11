import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../NavBar';
import ModalBase from '../modals/ModalBase';
import ChatPage from './ChatPage/ChatPage';
import ProtectedRoute from '../ProtectedRoute';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import NotFoundPage from './NotFoundPage';

const MainPage = () => (
  <div className="d-flex flex-column h-100">
    <ModalBase />
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default MainPage;
