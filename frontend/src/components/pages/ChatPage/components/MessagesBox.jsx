import React, { useEffect, useRef } from 'react';
import { Stack } from 'react-bootstrap';

const MessagesBox = ({ messages }) => {
  const boxRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      boxRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [messages]);

  return (
    <Stack ref={boxRef} className="h-100 ps-4 mb-3 overflow-auto">
      {messages.map((message) => (
        <div className="text-break" key={message.id}>
          <b>{message.username}</b>
          :&nbsp;
          {message.body}
        </div>
      ))}
    </Stack>
  );
};

export default MessagesBox;
