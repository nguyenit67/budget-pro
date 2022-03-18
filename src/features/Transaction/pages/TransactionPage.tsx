import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsDbRef } from 'services/firebase';
import transactionApi from 'services/transactionApi';
import { TransactionFormValues } from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import TransactionPieChart from '../components/TransactionPieChart';
import { selectTotalBalance, selectTransactions } from '../selectors';
import { setTransactions } from '../transactionSlice';

function TransactionPage() {
  const dispatch = useDispatch();
  const transactionList = useSelector(selectTransactions);
  const totalBalance = useSelector(selectTotalBalance);

  useEffect(() => {
    (async () => {
      const transactionsDbRef = await getTransactionsDbRef();

      transactionsDbRef.on(
        'value',
        (snapshot) => {
          // console.log('transactionsDbRef on value listener');
          const data = snapshot.val();
          if (data) {
            const transactionList = Object.entries(data).map(([key, value]: any) => ({
              id: key,
              transactionType: value.transactionType,
              amount: value.amount,
              category: value.category,
              date: value.date,
            }));

            // console.log('snapshot', data, transactionList);
            dispatch(setTransactions(transactionList));
          }
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
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={{
        // flex: '1 1 auto',
        justifyContent: 'center',
        overflow: 'auto',
        p: 2,
        paddingBottom: 0,

        gap: 4,
        '& > *': { flexBasis: '45%' },
      }}
    >
      <Box>
        <Typography variant="h5">Balance: ${totalBalance}</Typography>
        <TransactionList data={transactionList} />
      </Box>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexFlow: 'column',

          overflow: 'hidden',

          gap: 1,
          '& > *': {
            flex: '1 1 auto',
            // flexBasis: '50%',
            height: '50%',
            margin: 1,
            padding: 1,

            border: '1px solid',
            borderColor: '#ccc',
            borderRadius: '10px',
          },
        }}
      >
        <Box>
          <TransactionPieChart transactionType="Income" />
        </Box>
        <Box>
          <TransactionPieChart transactionType="Expense" />
        </Box>
      </Box>
    </Stack>
  );
}

export default TransactionPage;
