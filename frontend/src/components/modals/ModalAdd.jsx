import { useFormik } from 'formik';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import * as Yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import SocketApiContext from '../../contexts/SocketApiContext';
import notify from '../notifications/notify';

const ModalAdd = ({ addedChannels, closeHandler }) => {
  const { t } = useTranslation();
  const { addChannel } = useContext(SocketApiContext);
  const inputRef = useRef();
  const [isAdded, setIsAdded] = useState();

  const validationSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .notOneOf(addedChannels, t('errors.channelExists'))
      .required(t('errors.requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanedName = filter.clean(values.channelName);
      addChannel({ name: cleanedName }, setIsAdded);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAdded === false) {
      notify('error', t('toasts.networkError'));
    }
    if (isAdded) {
      notify('success', t('toasts.channelAdded'));
      closeHandler();
    }
  }, [isAdded]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.add.header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="channelName" hidden>
              {t('modals.add.label')}
            </Form.Label>
            <Form.Control
              name="channelName"
              id="channelName"
              type="text"
              value={formik.values.channelName}
              onChange={formik.handleChange}
              ref={inputRef}
              isInvalid={formik.errors.channelName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex mt-3 justify-content-end">
            <Button onClick={closeHandler} className="me-3" variant="secondary">
              {t('modals.add.cancelBtn')}
            </Button>
            <Button type="submit" disabled={formik.values.channelName === '' || isAdded === false}>
              {t('modals.add.submitBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalAdd;
