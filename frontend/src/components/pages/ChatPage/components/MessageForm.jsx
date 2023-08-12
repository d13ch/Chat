import { useFormik } from 'formik';
import React, {
  useContext, useEffect, useRef,
} from 'react';
import {
  Button, ButtonGroup, Form,
} from 'react-bootstrap';
import { MdSend } from '@react-icons/all-files/md/MdSend.esm';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import SocketApiContext from '../../../../contexts/SocketApiContext';
import notify from '../../../notifications/notify';

const MessageForm = ({ activeChannel }) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const { sendMessage } = useContext(SocketApiContext);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      try {
        const { username } = JSON.parse(localStorage.getItem('user'));
        const newMessage = {
          body: filter.clean(values.body),
          channelId: activeChannel,
          username,
        };
        await sendMessage(newMessage);
        formik.resetForm();
      } catch (error) {
        notify('error', t('toasts.networkError'));
        formik.setFieldValue('body', values.body);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannel, formik.isSubmitting]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group">
        <Form.Label htmlFor="body" hidden>{t('chatPage.formLabel')}</Form.Label>
        <Form.Control
          name="body"
          aria-label={t('chatPage.ariaLabel')}
          id="body"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder={t('chatPage.formPlaceholder')}
          ref={inputRef}
          className="rounded-start"
        />
        <ButtonGroup
          as={Button}
          type="submit"
          className="align-items-center"
          disabled={formik.values.body === '' || formik.isSubmitting}
        >
          <MdSend />
          <span className="visually-hidden">{t('chatPage.send')}</span>
        </ButtonGroup>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
