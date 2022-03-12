import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsDbRef } from 'services/firebase';
import transactionApi from 'services/transactionApi';
import TransactionForm, { TransactionFormValues } from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { selectTransactions } from '../selectors';
import { setTransactions } from '../transactionSlice';

function TransactionPage() {
  const dispatch = useDispatch();
  const transactionList = useSelector(selectTransactions);

  useEffect(() => {
    (async () => {
      const transactionsDbRef = await getTransactionsDbRef();

      console.log('transactionsDbRef path', transactionsDbRef.toString());

      transactionsDbRef.on(
        'value',
        (snapshot) => {
          console.log('transactionsDbRef on value listener');
          const data = snapshot.val();
          // @ts-ignore
          const transactionList = Object.entries(data).map(([key, value]: any) => ({
            id: key,
            transactionType: value.transactionType,
            amount: value.amount,
            category: value.category,
            date: value.date,
          }));

          // console.log('snapshot', data, transactionList);
          dispatch(setTransactions(transactionList));
        },
        (error) => {
          console.log('Cannot read transactionsDbRef', error);
        }
      );
    })();

    // return () => {
    //   (async () => {
    //     const transactionsDbRef = await getTransactionsDbRef();
    //     transactionsDbRef.off('value');
    //   })();
    // };
  }, []);

  const handleTransactionFormSubmit = async (values: TransactionFormValues) => {
    console.log('TransactionPage receives', values);

    try {
      await transactionApi.add(values);
    } catch (error) {
      console.log('handleTransactionFormSubmit error', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',

        '& > *': { flexBasis: '33.33%' },
      }}
    >
      <Box>
        <TransactionForm onSubmit={handleTransactionFormSubmit} />
      </Box>

      <TransactionList data={transactionList} />

      <Box flexBasis="100%"></Box>
    </Box>
  );
}

export default TransactionPage;
