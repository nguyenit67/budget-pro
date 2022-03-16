import { TRANSACTION_TYPES } from 'features/Transaction/components/TransactionForm';
import userApi from 'services/userApi';

export type UserBasicInfo = ReturnType<typeof userApi.getMe>;

// export type Transaction = {
//   id: string;
//   transactionType: 'Income' | 'Expense';
// };

export type TransactionTypeValues = {
  INCOME: 'Income';
  EXPENSE: 'Expense';
};
