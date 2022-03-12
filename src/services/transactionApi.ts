import { TransactionFormValues } from 'features/Transaction/components/TransactionForm';
import { TransactionId, TransactionItem } from 'features/Transaction/transactionSlice';
import { getTransactionsDbRef } from './firebase';

const transactionApi = {
  async add(params: TransactionFormValues) {
    const transactionsDbRef = await getTransactionsDbRef();

    const newItem = {
      ...params,
      date: typeof params.date === 'string' ? params.date : params.date.toISOString(),
    };

    return transactionsDbRef.push(newItem);
  },

  async updateOne(params: TransactionItem) {
    const newValue = {
      transactionType: params.transactionType,
      category: params.category,
      amount: params.amount,
      date: typeof params.date === 'string' ? params.date : params.date.toISOString(),
    };

    const transactionsDbRef = await getTransactionsDbRef();
    return transactionsDbRef.child(params.id).set(newValue);
  },

  async remove(id: TransactionId) {
    const transactionsDbRef = await getTransactionsDbRef();
    return transactionsDbRef.child(id).remove();
  },
};

export default transactionApi;
