// DashboardFeature entry

import { Stack } from '@mui/material';
import Header from 'components/Header';
import { Route, Routes } from 'react-router-dom';
import { database } from 'services/firebase';
import TransactionPage from './pages/TransactionPage';

const dbTransactionsRef = database.ref();

function TransactionFeature() {
  return (
    <Stack
      sx={{
        height: '100vh',
      }}
    >
      <Header />

      <Routes>
        <Route path="" element={<TransactionPage />} />
      </Routes>
    </Stack>
  );
}

export default TransactionFeature;
