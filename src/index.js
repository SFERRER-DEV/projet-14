import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './utils/style/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { EmployeesProvider } from './utils/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Header />
    <EmployeesProvider>
      <HomePage />
    </EmployeesProvider>
    <Footer />
  </React.StrictMode>
);
