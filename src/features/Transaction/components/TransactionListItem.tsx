import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import transactionApi from 'services/transactionApi';
import { TransactionItem } from '../transactionSlice';

type TransactionListItemProps = {
  transaction: TransactionItem;
};

function TransactionListItem({ transaction }: TransactionListItemProps) {
  const dispatch = useDispatch();

  const handleEditButtonClick = () => {};

  const handleRemoveButtonClick = async () => {
    try {
      await transactionApi.remove(transaction.id);
    } catch (error) {
      console.log(`Remove transaction ${transaction.id} failed`, error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',

        border: '1px solid #ccc',
        borderRadius: 2,
        p: 1,
      }}
    >
      <CurrencyExchangeIcon />

      <Box sx={{ flexBasis: '60%' }}>
        <Typography variant="body1">{transaction.category}</Typography>
        <Typography variant="body2">
          ${transaction.amount}, {new Date(transaction.date).toLocaleString()}
          {/* use Intel.DateFormat or something */}
        </Typography>
      </Box>

      <IconButton>
        <EditOutlinedIcon />
      </IconButton>

      <IconButton onClick={handleRemoveButtonClick}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Box>
  );
}

export default TransactionListItem;
