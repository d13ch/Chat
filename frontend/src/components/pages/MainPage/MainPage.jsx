import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ChannelsPanel from './components/ChannelsPanel.jsx';
import MessagesPanel from './components/MessagesPanel.jsx';
import routes from '../../../routes/index.js';
import { addChannels, setActiveChannel, setDefaultChannel } from '../../../slices/channelsSlice.js';
import { addMessages } from '../../../slices/messagesSlice.js';
import notify from '../../notifications/notify.js';

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getChannels = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        const {
          data: { channels, messages, currentChannelId },
        } = await axios.get(routes.dataPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setActiveChannel(currentChannelId));
        dispatch(setDefaultChannel(currentChannelId));
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
      } catch (error) {
        console.log(error);
        if (error.message === 'Network Error') {
          notify('error', t('toasts.networkError'));
        } else {
          notify('error', t('toasts.unknownError'));
        }
      }
    };

    getChannels();
  });

  return (
    <Container className="shadow h-100 px-1 my-4 overflow-hidden">
      <Row className="h-100 bg-white">
        <Col md="3" className="h-100 d-flex flex-column col-4 ps-3 pe-2 bg-light">
          <ChannelsPanel />
        </Col>
        <Col className="h-100 pe-3">
          <MessagesPanel />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
