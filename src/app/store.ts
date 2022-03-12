import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/Auth/userSlice';
import transactionReducer from 'features/Transaction/transactionSlice';

const rootReducer = {
  user: userReducer,
  transaction: transactionReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
