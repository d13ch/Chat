import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from '@react-icons/all-files/bs/BsPlusSquare.esm';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../../../slices/channelsSlice.js';
import Channel from './Channel.jsx';
import { showModal } from '../../../../slices/modalsSlice.js';

const ChannelsPanel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const handleAddChannel = () => {
    dispatch(showModal({ type: 'add' }));
  };

  return (
    <>
      <div className="ps-3 mt-4 mb-2 d-flex justify-content-between align-items-center">
        <b>
          {t('mainPage.channelsHeader')}
        </b>
        <ButtonGroup as={Button} onClick={handleAddChannel} className="text-primary fs-4 p-1" variant="light">
          <BsPlusSquare />
          <span className="visually-hidden">+</span>
        </ButtonGroup>
      </div>
      <hr />
      <Nav variant="pills" className="d-flex flex-column flex-nowrap h-100 overflow-y-auto overflow-x-hidden">
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
