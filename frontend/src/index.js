import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './index.css';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App';
import resources from './locales/index.js';
import store from './slices/index.js';
// import reportWebVitals from './reportWebVitals';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
