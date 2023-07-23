import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../../../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../../../../slices/channelsSlice.js';
import MessageForm from './MessageForm.jsx';

const Messages = ({ activeChannel }) => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === activeChannel.id);
  const messagesCount = currentChannelMessages.length;
  const selectedChannel = useSelector((state) => channelsSelectors
    .selectById(state, activeChannel));
  const header = selectedChannel ? selectedChannel.name : '';
  // console.log(selectedChannel);

  return (
    <div className="h-100 d-flex flex-column px-2">
      <div className="ps-4 mt-3">
        <h4 className="m-0">{header}</h4>
        <span className="text-muted">{t('mainPage.messagesCount', { count: messagesCount })}</span>
      </div>
      <hr />
      <div className="mt-auto mb-4">
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
