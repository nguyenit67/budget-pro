import userApi from 'services/userApi';

export type UserBasicInfo = ReturnType<typeof userApi.getMe>;

export type Transaction = {
  id: string;
  transactionType: 'Income' | 'Expense';
};
