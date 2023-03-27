import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './utils/style/GlobalStyle';
import HomePage from './pages/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <HomePage />
  </React.StrictMode>
);
