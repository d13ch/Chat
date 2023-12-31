import { useFormik } from 'formik';
import React, {
  useContext, useEffect, useRef,
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

  const validationSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .min(3, t('errors.nameLength'))
      .max(20, t('errors.nameLength'))
      .notOneOf(addedChannels, t('errors.channelExists'))
      .required(t('errors.requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const cleanedName = filter.clean(values.channelName);
        await addChannel({ name: cleanedName });
        notify('success', t('toasts.channelAdded'));
        closeHandler();
      } catch (error) {
        notify('error', t('toasts.networkError'));
        console.log(error);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
            <Form.Label htmlFor="channelName" className="visually-hidden">
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
            <Button type="submit" disabled={formik.values.channelName === '' || formik.isSubmitting}>
              {t('modals.add.submitBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalAdd;
