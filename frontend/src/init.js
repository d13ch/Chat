import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import MainPage from './components/pages/MainPage.jsx';
import AuthProvider from './components/providers/AuthProvider.jsx';
import SocketApiProvider from './components/providers/SocketApiProvider.jsx';
import store from './slices/index.js';
import { sendMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

const init = async (socket) => {
  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };

  await i18n
    .use(initReactI18next)
    .init(options);

  socket.on('newMessage', (message) => store.dispatch(sendMessage(message)));
  socket.on('newChannel', (channel) => store.dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => store.dispatch(removeChannel(id)));
  socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));

  const ruDict = filter.getDictionary('ru');
  filter.add(ruDict);

  const rollbarConfig = {
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    environment: 'testenv',
  };

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <SocketApiProvider socket={socket}>
              <MainPage />
              <ToastContainer transition={Slide} />
            </SocketApiProvider>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};

export default init;
