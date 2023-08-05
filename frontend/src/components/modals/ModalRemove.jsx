import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SocketApiContext from '../../contexts/SocketApiContext';
import { setActiveChannel } from '../../slices/channelsSlice';
import notify from '../notifications/notify';

const ModalRemove = ({ closeHandler, channelToProcess }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { removeChannel } = useContext(SocketApiContext);
  const defaultChannelId = useSelector((state) => state.channels.defaultChannel);
  const [isRemoved, setIsRemoved] = useState();

  const handleRemove = () => {
    removeChannel(channelToProcess, setIsRemoved);
  };

  useEffect(() => {
    if (isRemoved === false) {
      notify('error', t('toasts.networkError'));
    }
    if (isRemoved) {
      notify('success', t('toasts.channelRemoved'));
      dispatch(setActiveChannel(defaultChannelId));
      closeHandler();
    }
  }, [isRemoved]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <Button onClick={closeHandler} className="me-3" variant="secondary">
            {t('modals.remove.cancelBtn')}
          </Button>
          <Button onClick={handleRemove} variant="danger" disabled={isRemoved === false}>
            {t('modals.remove.submitBtn')}
          </Button>
        </div>
      </Modal.Body>
    </>

  );
};

export default ModalRemove;
