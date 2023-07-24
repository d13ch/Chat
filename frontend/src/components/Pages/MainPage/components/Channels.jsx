import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from '@react-icons/all-files/bs/BsPlusSquare.esm';
import { useTranslation } from 'react-i18next';
import { setActiveChannel, selectors } from '../../../../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  return (
    <>
      <div className="ps-3 my-4 d-flex justify-content-between align-items-center">
        <b>
          {t('mainPage.channelsHeader')}
        </b>
        <ButtonGroup as={Button} className="text-primary fs-4 p-1" variant="light">
          <BsPlusSquare />
        </ButtonGroup>
      </div>
      <hr />
      <Nav justify variant="pills" className="flex-column">
        {channels.map((channel) => (
          <Nav.Item key={channel.name}>
            <Nav.Link as={Button} onClick={() => dispatch(setActiveChannel(channel.id))} className="text-start" active={channel.id === activeChannel}>
              {channel.name}
            </Nav.Link>
          </Nav.Item>

        ))}
      </Nav>
    </>
  );
};

export default Channels;
