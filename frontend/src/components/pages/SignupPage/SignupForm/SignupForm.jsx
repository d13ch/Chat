import axios from 'axios';
import { useFormik } from 'formik';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import routes from '../../../../routes';
import AuthContext from '../../../../contexts/AuthContext';
import notify from '../../../notifications/notify';

const SignupForm = () => {
  const { t } = useTranslation();
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signupFailed, setSignupFailed] = useState(false);
  const inputRef = useRef();

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .min(3, t('errors.nameLength'))
      .max(20, t('errors.nameLength'))
      .required(t('errors.requiredField')),
    password: Yup
      .string()
      .min(6, t('errors.passwordLength'))
      .required(t('errors.requiredField')),
    passwordConfirmation: Yup
      .string()
      .oneOf([Yup.ref('password'), null], t('errors.passwordConfirmation'))
      .required(t('errors.requiredField')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async () => {
      setSignupFailed(false);
      try {
        const { data } = await axios.post(routes.signupPath(), {
          username: formik.values.username,
          password: formik.values.password,
        });
        formik.setSubmitting(false);
        logIn(data);
        navigate('/');
      } catch (error) {
        console.log(error);
        if (error.message === 'Network Error') {
          notify('error', t('toasts.networkError'));
        }
        if (error.isAxiosError && error.response.status === 409) {
          setSignupFailed(true);
        } else {
          notify('error', t('toasts.unknownError'));
        }
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.select();
  }, [signupFailed]);

  useEffect(() => {
    setSignupFailed(false);
  }, [formik.isValidating]);

  return (
    <Form onSubmit={formik.handleSubmit} className="col col-xxl-10">
      <Form.Group className="mt-3">
        <Form.Label className="ms-2 fw-semibold" htmlFor="username">
          {t('signupPage.username')}
        </Form.Label>
        <Form.Control
          type="text"
          name="username"
          id="username"
          value={formik.values.username}
          placeholder={t('signupPage.username')}
          onChange={formik.handleChange}
          ref={inputRef}
          isInvalid={(formik.touched.username && formik.errors.username) || signupFailed}
        />
        <Form.Control.Feedback className="ps-2" type="invalid">
          {signupFailed ? t('errors.userExists') : formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label className="ms-2 fw-semibold" htmlFor="password">
          {t('signupPage.password')}
        </Form.Label>
        <Form.Control
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          placeholder={t('signupPage.password')}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && formik.errors.password}
        />
        <Form.Control.Feedback className="ps-2" type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Label className="ms-2 fw-semibold" htmlFor="passwordConfirmation">
          {t('signupPage.passwordConfirmation')}
        </Form.Label>
        <Form.Control
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          placeholder={t('signupPage.passwordConfirmation')}
          onChange={formik.handleChange}
          isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
        />
        <Form.Control.Feedback className="ps-2" type="invalid">
          {formik.errors.passwordConfirmation}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex mt-4 pt-1 justify-content-end">
        <Button type="submit">{t('signupPage.submitBtn')}</Button>
      </div>
    </Form>
  );
};

export default SignupForm;
