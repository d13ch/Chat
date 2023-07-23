import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import routes from '../../../routes/index.js';

import { addChannels } from '../../../slices/channelsSlice.js';
import { addMessages } from '../../../slices/messagesSlice.js';

const MainPage = () => {
  const [activeChannel, setActiveChannel] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getChannels = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const {
        data: { channels, messages, currentChannelId },
      } = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setActiveChannel(currentChannelId);
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
      // console.log(1);
    };

    getChannels();
  });

  return (
    <Container className="shadow h-100 px-0 my-4 overflow-hidden">
      <Row className="flex-row h-100 bg-white">
        <Col md="3" className="col-4 ps-4 bg-light">
          <Channels activeChannel={activeChannel} />
        </Col>
        <Col className="pe-3">
          <Messages activeChannel={activeChannel} />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
