import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import {
  Button, ButtonGroup, Form,
} from 'react-bootstrap';
import { MdSend } from '@react-icons/all-files/md/MdSend.esm';
import { useTranslation } from 'react-i18next';

const MessageForm = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values, actions) => {
      values.text = '';
      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="input-group">
        <Form.Control
          name="text"
          id="text"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.text}
          placeholder={t('mainPage.formPlaceholder')}
          ref={inputRef}
        />
        <ButtonGroup as={Button} type="submit" className="align-items-center">
          <MdSend />
        </ButtonGroup>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
