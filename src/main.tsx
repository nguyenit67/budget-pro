import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'app/store';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from 'app/theme';

ReactDOM.render(
  // put <React.StrictMode> always on top for debugging
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={defaultTheme}>
              <App />
            </ThemeProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
