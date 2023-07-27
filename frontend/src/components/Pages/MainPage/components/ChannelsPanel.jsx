import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from '@react-icons/all-files/bs/BsPlusSquare.esm';
import { useTranslation } from 'react-i18next';
import { selectors, setActiveChannel } from '../../../../slices/channelsSlice.js';
import Channel from './Channel.jsx';
import socketApi from '../../../../socket.js';

const ChannelsPanel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  // const activeChannel = useSelector((state) => state.channels.activeChannel);
  const handleAddChannel = () => {
    const newChannelId = socketApi.addChanel({ name: 'a' });
    if (newChannelId) {
      dispatch(setActiveChannel(newChannelId));
    }
  };

  return (
    <>
      <div className="ps-3 my-4 d-flex justify-content-between align-items-center">
        <b>
          {t('mainPage.channelsHeader')}
        </b>
        <ButtonGroup as={Button} onClick={handleAddChannel} className="text-primary fs-4 p-1" variant="light">
          <BsPlusSquare />
        </ButtonGroup>
      </div>
      <hr />
      <Nav justify variant="pills" className="flex-column">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            <Channel channel={channel} />
          </Nav.Item>

        ))}
      </Nav>
    </>
  );
};

export default ChannelsPanel;
