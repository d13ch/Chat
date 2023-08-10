import React from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Container className="h-100" fluid>
      <Row className="h-100 justify-content-center align-items-center">
        <Col sm="8" md="6" xl="5" xxl="4">
          <Card className="py-5 h-100 shadow justify-items-center align-items-center">
            <Card.Body>
              <Card.Title className="pt-3 text-center">
                <h1>{t('notFoundPage.404')}</h1>
              </Card.Title>
              <h2>{t('notFoundPage.notFound')}</h2>
              <hr />
              <Card.Text className="pb-3 text-center">
                {t('notFoundPage.backTo')}
                {' '}
                <a href="/">{t('notFoundPage.mainPage')}</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
