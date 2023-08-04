import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import React, { useMemo } from 'react';
import { sendMessage } from '../slices/messagesSlice';
import {
  addChannel, removeChannel, renameChannel, setActiveChannel,
} from '../slices/channelsSlice';
import SocketApiContext from '../contexts/SocketApiContext';

const SocketApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  socket.on('newMessage', (message) => dispatch(sendMessage(message)));
  socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
  socket.on('renameChannel', (channel) => dispatch(renameChannel(channel)));

  const socketApi = {
    sendMessage: (message, setter, values) => {
      socket.emit('newMessage', message, (response) => {
        const { status } = response;
        if (status === 'ok') {
          setter(true);
          values.body = '';
        }
      });
    },
    addChannel: (channel) => {
      socket.emit('newChannel', channel, (response) => {
        const { status, data } = response;
        if (status === 'ok') {
          dispatch(setActiveChannel(data.id));
        }
      });
    },
    removeChannel: (channel) => {
      socket.emit('removeChannel', channel);
    },
    renameChannel: (id, name) => {
      socket.emit('renameChannel', { id, name });
    },
  };

  const contextData = useMemo(() => socketApi, [socketApi]);

  return (
    <SocketApiContext.Provider value={contextData}>
      {children}
    </SocketApiContext.Provider>
  );
};

export default SocketApiProvider;
