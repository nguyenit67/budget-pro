import { Box } from '@mui/material';
import { TransactionItem } from '../transactionSlice';
import TransactionListItem from './TransactionListItem';

type TransactionListProps = {
  data: TransactionItem[];
};

function TransactionList({ data }: TransactionListProps) {
  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',

        gap: 1, // gap between flex items
        '& > li': { flexBasis: '100%' },
      }}
    >
      {data.map((transaction) => (
        <li key={transaction.id}>
          <TransactionListItem transaction={transaction} />
        </li>
      ))}
    </Box>
  );
}

export default TransactionList;
