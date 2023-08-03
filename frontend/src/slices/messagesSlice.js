import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const restMessages = Object.values(state.entities)
        .filter((entity) => entity.channelId !== payload);
      messagesAdapter.setAll(state, restMessages);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { sendMessage, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
