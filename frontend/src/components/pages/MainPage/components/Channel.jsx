import React from 'react';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../../../../slices/channelsSlice';
import { showModal } from '../../../../slices/modalsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.channels.activeChannel);
  const handleRemoveChannel = (channelToRemove) => {
    dispatch(showModal({ type: 'remove', channel: channelToRemove }));
  };
  const handleRenameChannel = (channelToRename) => {
    dispatch(showModal({ type: 'rename', channel: channelToRename }));
  };

  return (
    channel.removable
      ? (
        <Dropdown as={ButtonGroup} className="w-100 d-flex">
          <Button onClick={() => dispatch(setActiveChannel(channel.id))} className="text-start text-truncate" active={channel.id === activeChannelId} variant="light">
            <span># </span>
            {channel.name}
          </Button>
          <Dropdown.Toggle className="flex-grow-0" split variant="light" active={channel.id === activeChannelId} />
          <Dropdown.Menu>
            <Dropdown.Item as={Button} onClick={() => handleRemoveChannel(channel)}>
              {t('mainPage.channelDropdown.remove')}
            </Dropdown.Item>
            <Dropdown.Item as={Button} onClick={() => handleRenameChannel(channel)}>
              {t('mainPage.channelDropdown.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      : (
        <Button
          onClick={() => dispatch(setActiveChannel(channel.id))}
          className="w-100 text-start"
          active={channel.id === activeChannelId}
          variant="light"
        >
          <span># </span>
          {channel.name}
        </Button>
      )
  );
};

export default Channel;
