import React, { useContext } from 'react';
import {
  Button, Container, Navbar,
} from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext.jsx';

const NavBar = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  return (
    <Navbar className="shadow" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">MyChat</Navbar.Brand>
        <Button onClick={logOut} hidden={!loggedIn}>Выйти</Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
