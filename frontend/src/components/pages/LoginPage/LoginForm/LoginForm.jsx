import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../../../routes/index.js';
import AuthContext from '../../../../contexts/AuthContext.jsx';
import notify from '../../../notifications/notify.js';

const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.reqiredField')),
    password: Yup.string().required(t('errors.reqiredField')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        });
        logIn(data);
        navigate('/');
      } catch (error) {
        console.log(error);
        if (error.message === 'Network Error') {
          notify('error', t('toasts.networkError'));
        }
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
        } else {
          notify('error', t('toasts.unknownError'));
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col col-xxl-10">
      <Form.Group className="mt-3">
        <Form.Label htmlFor="username" className="ms-2 fw-semibold">{t('loginPage.username')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('loginPage.usernamePlaceholder')}
          name="username"
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={authFailed}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label htmlFor="password" className="ms-2 fw-semibold">{t('loginPage.password')}</Form.Label>
        <Form.Control
          type="password"
          placeholder={t('loginPage.passwordPlaceholder')}
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={authFailed}
          required
        />
        <Form.Control.Feedback className="ps-2" type="invalid">{t('loginPage.wrongInputFeedback')}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button className="mt-5 w-100" variant="primary" type="submit">
          {t('loginPage.enterBtn')}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
