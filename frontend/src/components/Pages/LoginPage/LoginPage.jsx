import React from 'react';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import LoginForm from './LoginForm/LoginForm';

function LoginPage() {
  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col md="6" xxl="6">
          <Card className="my-5 shadow">
            <Card.Body className="row p-5">
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
