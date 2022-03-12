import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TRANSACTION_TYPES } from './components/TransactionForm';

export const selectTransactions = (state: RootState) => state.transaction.transactions;

export const selectBalance = createSelector(selectTransactions, (transactionList) =>
  transactionList.reduce((total, transaction) => {
    return (
      total +
      (transaction.transactionType === TRANSACTION_TYPES.INCOME
        ? transaction.amount
        : -transaction.amount)
    );
  }, 0)
);

export const selectTotalIncome = createSelector(selectTransactions, (transactions) =>
  transactions
    .filter((x) => x.transactionType === TRANSACTION_TYPES.INCOME)
    .reduce((total, transaction) => total + transaction.amount, 0)
);

export const selectTotalExpense = createSelector(selectTransactions, (transactions) =>
  transactions
    .filter((x) => x.transactionType === TRANSACTION_TYPES.EXPENSE)
    .reduce((total, transaction) => total + transaction.amount, 0)
);
