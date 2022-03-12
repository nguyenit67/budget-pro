import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionFormValues } from './components/TransactionForm';

interface TransactionState {
  transactions: TransactionItem[];
}

export type TransactionId = string;

export interface TransactionItem extends TransactionFormValues {
  id: TransactionId;
}

// create a slice for transaction
export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
  } as TransactionState,
  reducers: {
    setTransactions(state, action) {
      const newTransactionList = action.payload;
      state.transactions = newTransactionList;
    },
    addTransaction(state, action: PayloadAction<TransactionItem>) {
      const newTransaction = action.payload;
      state.transactions.push(newTransaction);
    },

    updateTransaction(state, action: PayloadAction<TransactionItem>) {
      const newTransaction = action.payload;
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === newTransaction.id
      );
      state.transactions[index] = newTransaction;
    },

    removeTransaction(state, action: PayloadAction<{ id: TransactionId }>) {
      const { id: idToRemove } = action.payload;
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== idToRemove
      );
    },
  },
});

const { actions, reducer: transactionReducer } = transactionSlice;
export const { setTransactions, addTransaction, removeTransaction, updateTransaction } = actions;

export default transactionReducer;
