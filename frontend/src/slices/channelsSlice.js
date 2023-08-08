/* eslint no-param-reassign: ["error", { "props": false }] */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  activeChannel: null,
  defaultChannel: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = payload;
    },
    setDefaultChannel: (state, { payload }) => {
      state.defaultChannel = payload;
    },
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.setOne,
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  setActiveChannel, setDefaultChannel, addChannel, addChannels, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
