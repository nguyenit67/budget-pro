// DashboardFeature entry

import { Box } from '@mui/material';
import Header from 'components/Header';
import { Route, Routes } from 'react-router-dom';
import { database } from 'services/firebase';
import TransactionPage from './pages/TransactionPage';

const dbTransactionsRef = database.ref();

function TransactionFeature() {
  return (
    <Box>
      <Header />

      <Routes>
        <Route path="" element={<TransactionPage />} />
      </Routes>
    </Box>
  );
}

export default TransactionFeature;
