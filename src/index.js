import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './utils/style/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { EmployeesProvider } from './utils/context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Header />
    <EmployeesProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <HomePage />
      </LocalizationProvider>
    </EmployeesProvider>
    <Footer />
  </React.StrictMode>
);
