import { useFormik } from 'formik';
import React, {
  useContext, useEffect, useRef, useState,
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
  const [isSent, setIsSent] = useState();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const { username } = JSON.parse(localStorage.getItem('user'));
      const newMessage = {
        body: filter.clean(values.body),
        channelId: activeChannel,
        username,
      };
      sendMessage(newMessage, setIsSent);
      formik.setSubmitting(false);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannel]);

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
          aria-label={t('mainPage.ariaLabel')}
          id="body"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder={t('mainPage.formPlaceholder')}
          ref={inputRef}
          className="rounded-start"
        />
        <ButtonGroup
          as={Button}
          type="submit"
          className="align-items-center"
          disabled={formik.values.body === '' || isSent === false}
        >
          <MdSend />
          <span className="visually-hidden">{t('mainPage.send')}</span>
        </ButtonGroup>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
