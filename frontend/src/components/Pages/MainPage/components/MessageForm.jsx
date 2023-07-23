import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import {
  Button, ButtonGroup, Form, InputGroup,
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
    onSubmit: (values) => {
      values.text = '';
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          name="text"
          id="text"
          type="text"
          onChange={formik.handleChange}
          placeholder={t('mainPage.formPlaceholder')}
          ref={inputRef}
        />
        <ButtonGroup as={Button} className="align-items-center">
          <MdSend />
        </ButtonGroup>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
