import React from 'react';
// import { useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';
// import { selectors } from '../../../../slices/messagesSlice';

const MessagesBox = ({ messages }) => (
  <Stack className="ps-4">
    {messages.map((message) => (
      <div key={message.id}>
        <b>{message.username}</b>
        :&nbsp;
        {message.body}
      </div>
    ))}
  </Stack>
);

export default MessagesBox;
