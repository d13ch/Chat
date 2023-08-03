import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice.js';
import messages from './messagesSlice.js';
import modals from './modalsSlice.js';

const store = configureStore({
  reducer: {
    channels,
    messages,
    modals,
  },
});

export default store;
