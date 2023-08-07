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
    sendMessage: (message, setter) => {
      socket.timeout(1000).emit('newMessage', message, (error, response) => {
        if (error) {
          setter(false);
          setTimeout(() => setter(undefined), 2000);
          console.log(error);
        } else {
          const { status } = response;
          if (status === 'ok') {
            setter(true);
          }
        }
      });
    },
    addChannel: (channel, setter) => {
      socket.timeout(1000).emit('newChannel', channel, (error, response) => {
        if (error) {
          setter(false);
          setTimeout(() => setter(undefined), 2000);
          console.log(error);
        } else {
          const { status, data } = response;
          if (status === 'ok') {
            dispatch(setActiveChannel(data.id));
            setter(true);
          }
        }
      });
    },
    removeChannel: (channel, setter) => {
      socket.timeout(1000).emit('removeChannel', channel, (error, response) => {
        if (error) {
          setter(false);
          setTimeout(() => setter(undefined), 2000);
          console.log(error);
        } else {
          const { status } = response;
          if (status === 'ok') {
            setter(true);
          }
        }
      });
    },
    renameChannel: (id, name, setter) => {
      socket.timeout(1000).emit('renameChannel', { id, name }, (error, response) => {
        if (error) {
          setter(false);
          setTimeout(() => setter(undefined), 2000);
          console.log(error);
        } else {
          const { status } = response;
          if (status === 'ok') {
            setter(true);
          }
        }
      });
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
