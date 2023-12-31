import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../../../../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../../../../slices/channelsSlice.js';
import MessageForm from './MessageForm.jsx';
import MessagesBox from './MessagesBox.jsx';

const MessagesPanel = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === activeChannel);
  const messagesCount = currentChannelMessages.length;
  const selectedChannel = useSelector((state) => channelsSelectors
    .selectById(state, activeChannel));
  const header = selectedChannel ? selectedChannel.name : '';

  return (
    <div className="h-100 d-flex flex-column px-2">
      <div className="ps-4 mt-3">
        <h4 className="m-0">
          <span># </span>
          {header}
        </h4>
        <span className="text-muted">{t('chatPage.messagesCount', { count: messagesCount })}</span>
      </div>
      <hr />
      <MessagesBox messages={currentChannelMessages} />
      <div className="mt-auto mb-4">
        <MessageForm activeChannel={activeChannel} />
      </div>
    </div>
  );
};

export default MessagesPanel;
