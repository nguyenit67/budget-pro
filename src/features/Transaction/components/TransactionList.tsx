import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TransactionItem } from '../transactionSlice';
import { Box } from '@mui/material';
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

        '& > li': { flexBasis: '100%' },
        gap: 1,
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
