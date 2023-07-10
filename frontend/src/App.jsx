import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/Pages/MainPage';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>

  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit
  //       <code>src/App.jsx</code>
  //       and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </header>
  // </div>
  );
}

export default App;
