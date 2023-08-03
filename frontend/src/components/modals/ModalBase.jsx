import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import getModal from './index.js';
import { closeModal } from '../../slices/modalsSlice';
import { selectors } from '../../slices/channelsSlice';

const ModalBase = () => {
  const dispatch = useDispatch();
  const activeModalType = useSelector((state) => state.modals.activeModalType);
  const SelectedModal = getModal(activeModalType);
  const handleClose = () => dispatch(closeModal());
  const isOpen = useSelector((state) => state.modals.isOpen);
  const addedChannelsNames = useSelector(selectors.selectAll)
    .map((channel) => channel.name);
  const channelToProcess = useSelector((state) => state.modals.channelToProcess);

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      {SelectedModal && (
      <SelectedModal
        addedChannels={addedChannelsNames}
        closeHandler={handleClose}
        channelToProcess={channelToProcess}
      />
      )}
    </Modal>
  );
};

export default ModalBase;
