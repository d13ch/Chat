import React from 'react';
import { Stack } from 'react-bootstrap';

const MessagesBox = ({ messages }) => (
  <Stack className="h-100 ps-4 overflow-auto">
    {messages.map((message) => (
      <div className="text-break" key={message.id}>
        <b>{message.username}</b>
        :&nbsp;
        {message.body}
      </div>
    ))}
  </Stack>
);

export default MessagesBox;
