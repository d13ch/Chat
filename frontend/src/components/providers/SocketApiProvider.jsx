import { useDispatch } from 'react-redux';
import React, { useMemo } from 'react';
import { setActiveChannel } from '../../slices/channelsSlice';
import SocketApiContext from '../../contexts/SocketApiContext';

const SocketApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

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

  const {
    sendMessage, addChannel, removeChannel, renameChannel,
  } = socketApi;

  const contextData = useMemo(() => socketApi, [
    sendMessage,
    addChannel,
    removeChannel,
    renameChannel,
  ]);

  return (
    <SocketApiContext.Provider value={contextData}>
      {children}
    </SocketApiContext.Provider>
  );
};

export default SocketApiProvider;
