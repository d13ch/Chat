import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/index.js';
import MainPage from './components/pages/MainPage/MainPage.jsx';
import LoginPage from './components/pages/LoginPage/LoginPage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar.jsx';
import SocketApiProvider from './components/SocketApiProvider.jsx';
import SignupPage from './components/pages/SignupPage/SignupPage.jsx';

// const dispatch = useDispatch();
// socket.on('newMessage', (message) => dispatch(sendMessage(message)));
// socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
// socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
// socket.on('renameChannel', ({ id, name }) => dispatch(renameChannel({ id, changes: name })));

const App = () => {
  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };

  i18n
    .use(initReactI18next)
    .init(options);

  const ruDict = filter.getDictionary('ru');
  filter.add(ruDict);

  const rollbarConfig = {
    accessToken: 'fe7a6539c9eb49c3b0a34988b3733c70',
    environment: 'testenv',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <SocketApiProvider>
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
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </div>
            <ToastContainer transition={Slide} />
          </SocketApiProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>

  );
};
export default App;
