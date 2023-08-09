import React from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SignupForm from './SignupForm/SignupForm';

const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-10" sm="8" md="6" xl="5">
          <Card className="my-5 shadow">
            <Card.Body className="row p-5 justify-content-center">
              <h1 className="text-center">{t('signupPage.header')}</h1>
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
