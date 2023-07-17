import React from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';

const NotFoundPage = () => (
  <Container className="h-100" fluid>
    <Row className="h-100 justify-content-center align-items-center">
      <Col md="6" xxl="6">
        <Card className="my-5 py-5 h-100 shadow justify-items-center align-items-center">
          <Card.Body>
            <Card.Title className="text-center">
              <h1>404</h1>
            </Card.Title>
            <h2>Страница не найдена</h2>
            <hr />
            <Card.Text className="text-center">
              Вернуться на
              {' '}
              <a href="/">главную</a>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default NotFoundPage;
