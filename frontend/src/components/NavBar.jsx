import React, { useContext, useEffect } from 'react';
import {
  Button, Dropdown, Container, Navbar,
} from 'react-bootstrap';
import { MdLanguage } from '@react-icons/all-files/md/MdLanguage.js';
import { useTranslation } from 'react-i18next';
import AuthContext from '../contexts/AuthContext.jsx';
import locales from '../locales/index.js';

const NavBar = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const langs = Object.keys(locales);

  useEffect(() => {
    localStorage.setItem('lang', i18n.resolvedLanguage);
  }, [i18n.resolvedLanguage]);

  return (
    <Navbar className="shadow" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Dropdown>
          <Dropdown.Toggle variant="dark" className="p-0 text-light text-center">
            <MdLanguage className="fs-2" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {langs.map((lang) => (
              <Dropdown.Item
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                active={i18n.resolvedLanguage === lang}
              >
                {t(`navbar.${lang}`)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Navbar.Collapse className="justify-content-end">
          <Button
            onClick={logOut}
            hidden={!loggedIn}
            className="me-4"
          >
            {t('navbar.exitBtn')}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
