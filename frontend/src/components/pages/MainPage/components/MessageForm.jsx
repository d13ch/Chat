import { useFormik } from 'formik';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Button, ButtonGroup, Form,
} from 'react-bootstrap';
import { MdSend } from '@react-icons/all-files/md/MdSend.esm';
import { useTranslation } from 'react-i18next';
import SocketApiContext from '../../../../contexts/SocketApiContext';
import notify from '../../../notifications/notify';

const MessageForm = ({ activeChannel }) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const { sendMessage } = useContext(SocketApiContext);
  const [isSent, setIsSent] = useState();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const { username } = JSON.parse(localStorage.getItem('user'));
      const newMessage = {
        body: values.body,
        channelId: activeChannel,
        username,
      };
      sendMessage(newMessage, setIsSent);
      formik.setSubmitting(false);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isSent === false) {
      notify('error', t('toasts.networkError'));
    }
    if (isSent) {
      setIsSent(undefined);
      formik.values.body = '';
    }
  }, [isSent]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group">
        <Form.Label htmlFor="body" hidden>{t('mainPage.formLabel')}</Form.Label>
        <Form.Control
          name="body"
          id="body"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder={t('mainPage.formPlaceholder')}
          ref={inputRef}
        />
        <ButtonGroup
          as={Button}
          type="submit"
          className="align-items-center"
          disabled={formik.values.body === '' || isSent === false}
        >
          <MdSend />
        </ButtonGroup>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
