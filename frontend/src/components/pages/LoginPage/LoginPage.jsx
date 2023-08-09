import React from 'react';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm/LoginForm.jsx';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-10" sm="8" md="6" xl="5">
          <Card className="my-5 shadow">
            <Card.Body className="row pb-4 p-5 justify-content-center">
              <h1 className="text-center">{t('loginPage.header')}</h1>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-3 text-center">
              <span>{t('loginPage.footerText')}</span>
              {' '}
              <a href="/signup">{t('loginPage.signup')}</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
