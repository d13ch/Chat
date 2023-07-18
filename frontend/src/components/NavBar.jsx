import React, { useContext } from 'react';
import {
  Button, Container, Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts/AuthContext.jsx';

const NavBar = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Navbar className="shadow" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">MyChat</Navbar.Brand>
        <Button onClick={logOut} hidden={!loggedIn}>{t('navbar.exitBtn')}</Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
