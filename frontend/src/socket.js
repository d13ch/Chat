import { io } from 'socket.io-client';

const socket = io();

const socketApi = {
  sendMessage: (message) => {
    socket.emit('newMessage', message, (response) => {
      const { status } = response;
      return status === 'ok' ? status : null;
    });
  },
  addChanel: (channel) => {
    socket.emit('newChannel', channel, (response) => {
      const { status, data } = response;
      if (status === 'ok') {
        return data.id;
      } return null;
    });
  },
  removeChannel: (channel) => {
    socket.emit('removeChannel', channel, ({ status }) => {
      if (status !== 'ok') {
        throw new Error('Unable to remove channel');
      }
    });
  },
  renameChannel: (channel) => {
    socket.emit('renameChannel', channel);
  },
};

export { socket };
export default socketApi;
