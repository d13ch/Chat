import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../../../routes/index.js';
import AuthContext from '../../../../contexts/AuthContext.jsx';

const LoginForm = () => {
  const { logIn } = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.reqiredField')),
    password: Yup.string().required(t('errors.reqiredField')),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        try {
          const { data } = await axios.post(routes.loginPath(), {
            username: values.username,
            password: values.password,
          });
          actions.setSubmitting(false);
          logIn(data);
          navigate('/');
        } catch (error) {
          if (error.isAxiosError && error.response.status === 401) {
            setAuthFailed(true);
          } else {
            throw error;
          }
        }
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="username" className="ms-2 fw-semibold">{t('loginPage.username')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('loginPage.usernamePlaceholder')}
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
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
              value={values.password}
              onChange={handleChange}
              isInvalid={authFailed}
              required
            />
            <Form.Control.Feedback className="ps-2" type="invalid">{t('loginPage.wrongInputFeedback')}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="col-4 mt-4" variant="primary" type="submit">
              {t('loginPage.enterBtn')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>

  );
};

export default LoginForm;
