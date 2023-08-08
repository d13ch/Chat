import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    activeModalType: null,
    isOpen: false,
    channelToProcess: null,
  },
  reducers: {
    showModal: (state, { payload }) => {
      const { type, channel } = payload;
      state.isOpen = true;
      state.activeModalType = type;
      state.channelToProcess = channel;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.activeModalType = null;
      state.channelToProcess = null;
    },
  },
});

export const { setActiveModalType, showModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
