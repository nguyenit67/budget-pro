import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import transactionApi from 'services/transactionApi';
import { TransactionItem } from '../transactionSlice';
import TransactionForm, { TransactionFormValues } from './TransactionForm';

type TransactionListItemProps = {
  transaction: TransactionItem;
};

function TransactionListItem({ transaction }: TransactionListItemProps) {
  const [openTransactionEdit, setOpenTransactionEdit] = useState(false);

  const handleTransactionFormUpdateSubmit = async (values: TransactionFormValues) => {
    console.log('TransactionPage receives', values);

    try {
      const params = {
        ...values,
        id: transaction.id,
      };
      await transactionApi.updateOne(params);
      setOpenTransactionEdit(false);
    } catch (error) {
      console.log('handleTransactionFormSubmit error', error);
    }
  };

  const handleEditButtonClick = () => {
    setOpenTransactionEdit(true);
  };

  const handleRemoveButtonClick = async () => {
    try {
      await transactionApi.remove(transaction.id);
    } catch (error) {
      console.log(`Remove transaction ${transaction.id} failed`, error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          justifyContent: 'space-around',

          border: '1px solid #ccc',
          borderRadius: 2,
          p: 1,
        }}
      >
        <CurrencyExchangeIcon />

        <Box sx={{ flexBasis: '40%' }}>
          <Typography variant="body1">{transaction.category}</Typography>
          <Typography variant="body2">
            {new Date(transaction.date).toLocaleString()}
            {/* use Intl.DateFormat or something */}
          </Typography>
        </Box>

        <Box sx={{ flexBasis: '10%' }}>
          <Typography variant="body1">${transaction.amount}</Typography>
        </Box>

        <Box component={IconButton} onClick={handleEditButtonClick} sx={{ flexBasis: '10%' }}>
          <EditOutlinedIcon />
        </Box>

        <Box component={IconButton} onClick={handleRemoveButtonClick} sx={{ flexBasis: '10%' }}>
          <DeleteOutlinedIcon />
        </Box>
      </Box>

      <Dialog open={openTransactionEdit}>
        <DialogContent>
          <TransactionForm
            mode="update"
            onSubmit={handleTransactionFormUpdateSubmit}
            defaultValues={{
              transactionType: transaction.transactionType,
              amount: transaction.amount,
              category: transaction.category,
              date: transaction.date,
            }}
          />

          <Box textAlign="center" mt={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenTransactionEdit(false)}
              fullWidth
            >
              Cancel edit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TransactionListItem;
