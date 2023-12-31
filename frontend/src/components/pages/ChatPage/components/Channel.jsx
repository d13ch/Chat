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

  const color = channel.id === activeChannelId ? 'primary' : 'light';

  return (
    channel.removable
      ? (
        <Dropdown as={ButtonGroup} className="w-100 d-flex">
          <Button
            onClick={() => dispatch(setActiveChannel(channel.id))}
            className="text-start text-truncate"
            active={channel.id === activeChannelId}
            variant={color}
          >
            <span># </span>
            {channel.name}
          </Button>
          <Dropdown.Toggle className="flex-grow-0" split variant={color} active={channel.id === activeChannelId}>
            <span className="visually-hidden">{t('chatPage.channelDropdown.label')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Button} onClick={() => handleRemoveChannel(channel)}>
              {t('chatPage.channelDropdown.remove')}
            </Dropdown.Item>
            <Dropdown.Item as={Button} onClick={() => handleRenameChannel(channel)}>
              {t('chatPage.channelDropdown.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      : (
        <Button
          onClick={() => dispatch(setActiveChannel(channel.id))}
          className="w-100 text-start"
          active={channel.id === activeChannelId}
          variant={color}
        >
          <span># </span>
          {channel.name}
        </Button>
      )
  );
};

export default Channel;
