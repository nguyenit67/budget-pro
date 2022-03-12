import { TransactionFormValues } from 'features/Transaction/components/TransactionForm';
import { TransactionId, TransactionItem } from 'features/Transaction/transactionSlice';
import { getTransactionsDbRef } from './firebase';

const transactionApi = {
  async add(params: TransactionFormValues) {
    console.log('transactionApi.add params⌨🖨🖥📀💿💾💻', params);

    const transactionsDbRef = await getTransactionsDbRef();
    params.date = params.date.toISOString();
    return transactionsDbRef.push(params);
  },

  async update(data: TransactionItem) {
    const newItem: TransactionFormValues = {
      transactionType: data.transactionType,
      category: data.category,
      amount: data.amount,
      date: data.date,
    };

    const transactionsDbRef = await getTransactionsDbRef();
    return transactionsDbRef.child(data.id).set(newItem);
  },

  async remove(id: TransactionId) {
    const transactionsDbRef = await getTransactionsDbRef();
    return transactionsDbRef.child(id).remove();
  },
};

export default transactionApi;
