import { Box, Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import transactionApi from 'services/transactionApi';
import { TransactionItem } from '../transactionSlice';
import TransactionForm, { TransactionFormValues } from './TransactionForm';
import TransactionListItem from './TransactionListItem';
import AddIcon from '@mui/icons-material/Add';

type TransactionListProps = {
  data: TransactionItem[];
};

function TransactionList({ data }: TransactionListProps) {
  const reversedTransactions = [...data].reverse();
  const [openAddNewForm, setOpenAddNewForm] = useState(false);

  const handleTransactionFormSubmit = async (values: TransactionFormValues) => {
    console.log('TransactionPage receives', values);

    try {
      await transactionApi.add(values);
    } catch (error) {
      console.log('handleTransactionFormSubmit error', error);
    }
  };

  const handleAddButtonClick = () => {
    setOpenAddNewForm(!openAddNewForm);
  };

  const transitionCssValue = 'all 0.75s ease-in-out';
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex">
        <Typography variant="h6" flexGrow={1}>
          Transactions
        </Typography>

        {openAddNewForm && (
          <Button
            color="info"
            variant="contained"
            onClick={() => setOpenAddNewForm(false)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
        )}

        <Button
          variant={openAddNewForm ? 'outlined' : 'contained'}
          sx={
            {
              /*  transition: transitionCssValue  */
            }
          }
          onClick={handleAddButtonClick}
        >
          {!openAddNewForm ? (
            <>
              <AddIcon /> New Transaction
            </>
          ) : (
            'Clear Form'
          )}
        </Button>
      </Stack>

      <Box
        sx={{
          maxHeight: openAddNewForm ? '100vh' : 0,
          transition: transitionCssValue,
          overflow: 'hidden',
        }}
      >
        <TransactionForm onSubmit={handleTransactionFormSubmit} />
      </Box>

      <Stack sx={{ gap: 1, mt: 2 }}>
        {reversedTransactions.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))}
      </Stack>
    </Box>
  );
}

export default TransactionList;
