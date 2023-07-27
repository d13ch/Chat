import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ChannelsPanel from './components/ChannelsPanel.jsx';
import MessagesPanel from './components/MessagesPanel.jsx';
import routes from '../../../routes/index.js';

import { addChannels, setActiveChannel } from '../../../slices/channelsSlice.js';
import { addMessages } from '../../../slices/messagesSlice.js';

const MainPage = () => {
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

      dispatch(setActiveChannel(currentChannelId));
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
    };

    getChannels();
  });

  return (
    <Container className="shadow h-100 px-0 my-4 overflow-hidden">
      <Row className="flex-row h-100 bg-white">
        <Col md="3" className="col-4 ps-4 bg-light">
          <ChannelsPanel />
        </Col>
        <Col className="pe-3">
          <MessagesPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
