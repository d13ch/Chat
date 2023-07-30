import React, { useContext } from 'react';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../../../../slices/channelsSlice';
// import socketApi from '../../../../socket';
import SocketApiContext from '../../../../contexts/SocketApiContext';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { removeChannel } = useContext(SocketApiContext);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const handleRemove = (channelToRemove) => {
    try {
      removeChannel(channelToRemove);
      // dispatch(removeChannel(channelToRemove.id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    channel.removable
      ? (
        <Dropdown as={ButtonGroup} className="w-100 d-flex">
          <Button onClick={() => dispatch(setActiveChannel(channel.id))} className="text-start" active={channel.id === activeChannel} variant="light">
            {channel.name}
          </Button>
          <Dropdown.Toggle className="flex-grow-0" split variant="light" active={channel.id === activeChannel} />
          <Dropdown.Menu>
            <Dropdown.Item as={Button} onClick={() => handleRemove(channel)}>
              {t('mainPage.channelDropdown.remove')}
            </Dropdown.Item>
            <Dropdown.Item as={Button}>
              {t('mainPage.channelDropdown.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      : (
        <Button
          onClick={() => dispatch(setActiveChannel(channel.id))}
          className="w-100 text-start"
          active={channel.id === activeChannel}
          variant="light"
        >
          {channel.name}
        </Button>
      )
  );
};

export default Channel;
