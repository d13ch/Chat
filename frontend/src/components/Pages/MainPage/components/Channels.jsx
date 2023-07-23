import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Nav } from 'react-bootstrap';
import { BsPlusSquare } from '@react-icons/all-files/bs/BsPlusSquare.esm';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../../../slices/channelsSlice.js';

const Channels = ({ activeChannel }) => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);

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
            <Nav.Link as={Button} className="text-start" active={channel.id === activeChannel}>
              {channel.name}
            </Nav.Link>
          </Nav.Item>

        ))}
      </Nav>
    </>
  );
};

export default Channels;
