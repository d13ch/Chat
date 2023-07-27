import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import {
  Button, ButtonGroup, Form,
} from 'react-bootstrap';
import { MdSend } from '@react-icons/all-files/md/MdSend.esm';
import { useTranslation } from 'react-i18next';
import socketApi from '../../../../socket';

const MessageForm = ({ activeChannel }) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, actions) => {
      const { username } = JSON.parse(localStorage.getItem('user'));
      const newMessage = {
        body: values.body,
        channelId: activeChannel,
        username,
      };
      try {
        socketApi.sendMessage(newMessage);
        values.body = '';
        actions.setSubmitting(false);
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group">
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
          disabled={formik.values.body === '' || formik.isSubmitting}
        >
          <MdSend />
        </ButtonGroup>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
