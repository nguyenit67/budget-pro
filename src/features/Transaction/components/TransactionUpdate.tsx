// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import TransactionForm, { TransactionFormValues } from './TransactionForm';
// import transactionApi from 'services/transactionApi';
// import { TransactionId } from '../transactionSlice';

// type TransactionUpdateProps = {
//   id: TransactionId;
// };

// function TransactionUpdate({ id }: TransactionUpdateProps) {
//   const handleTransactionFormSubmit = async (values: TransactionFormValues) => {
//     console.log('TransactionPage receives', values);

//     try {
//       await transactionApi.update();
//     } catch (error) {
//       console.log('handleTransactionFormSubmit error', error);
//     }
//   };

//   return (
//     <div>
//       <TransactionForm mode="update" onSubmit={handleTransactionFormSubmit} />
//     </div>
//   );
// }

// export default TransactionUpdate;
