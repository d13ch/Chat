import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import React, { useMemo } from 'react';
import { sendMessage } from '../../slices/messagesSlice';
import {
  addChannel, removeChannel, renameChannel, setActiveChannel,
} from '../../slices/channelsSlice';
import SocketApiContext from '../../contexts/SocketApiContext';

const SocketApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  socket.on('newMessage', (message) => dispatch(sendMessage(message)));
  socket.on('newChannel', (channel) => dispatch(addChannel(channel)));
  socket.on('removeChannel', ({ id }) => dispatch(removeChannel(id)));
  socket.on('renameChannel', (channel) => dispatch(renameChannel(channel)));

  const socketApi = {
    sendMessage: (message) => new Promise((resolve, reject) => {
      socket.timeout(1000).emit('newMessage', message, (error, response) => (
        response?.status === 'ok' ? resolve(response?.data) : reject(error)
      ));
    }),
    addChannel: (channel) => new Promise((resolve, reject) => {
      socket.timeout(1000).emit('newChannel', channel, (error, response) => {
        if (error) {
          reject(error);
        }
        resolve(response?.data);
        dispatch(setActiveChannel(response?.data.id));
      });
    }),
    removeChannel: (channel) => new Promise((resolve, reject) => {
      socket.timeout(1000).emit('removeChannel', channel, (error, response) => (
        response?.status === 'ok' ? resolve(response?.data) : reject(error)
      ));
    }),
    renameChannel: (id, name) => new Promise((resolve, reject) => {
      socket.timeout(1000).emit('renameChannel', { id, name }, (error, response) => (
        response?.status === 'ok' ? resolve(response?.data) : reject(error)
      ));
    }),
  };

  const contextData = useMemo(() => socketApi, [
    socketApi.sendMessage,
    socketApi.addChannel,
    socketApi.removeChannel,
    socketApi.renameChannel,
  ]);

  return (
    <SocketApiContext.Provider value={contextData}>
      {children}
    </SocketApiContext.Provider>
  );
};

export default SocketApiProvider;
