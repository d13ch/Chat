import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

function LoginForm() {
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required('Обязательно для ввода'),
    password: Yup.string().required('Обязательно для ввода'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={SignupSchema}
    >
      {({ values, handleChange }) => (
        <Form className="col-12">
          <h1 className="text-center">Войти</h1>
          <Form.Group className="mt-3">
            <Form.Label className="mx-2 fw-semibold">Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя пользователя"
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="mx-2 fw-semibold">Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="mt-4 mx-1" variant="primary" type="submit">
              Войти
            </Button>
          </div>
        </Form>
      )}
    </Formik>

  );
}

export default LoginForm;
