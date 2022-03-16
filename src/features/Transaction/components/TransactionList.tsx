import { Box } from '@mui/material';
import { TransactionItem } from '../transactionSlice';
import TransactionListItem from './TransactionListItem';

type TransactionListProps = {
  data: TransactionItem[];
};

function TransactionList({ data }: TransactionListProps) {
  const reversedTransactions = [...data].reverse();

  return (
    <Box
      component="ul"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',
        m: 0,
        p: 0,

        overflow: 'auto',

        gap: 1, // gap between flex items
        // '& > li': { flexBasis: '100%' },
      }}
    >
      {reversedTransactions.map((transaction) => (
        <li key={transaction.id}>
          <TransactionListItem transaction={transaction} />
        </li>
      ))}
    </Box>
  );
}

export default TransactionList;
