import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { sendMessage, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
