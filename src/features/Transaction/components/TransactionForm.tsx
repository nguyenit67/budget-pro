import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import DateField from 'components/form-controls/DateField';
import NumberField from 'components/form-controls/NumberField';
import SelectField from 'components/form-controls/SelectField';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type TransactionFormValues = {
  transactionType: string;
  category: string;
  amount: number;
  date: Date;
};

interface TransactionFormProps {
  onSubmit?: (values: TransactionFormValues) => void;
  mode?: 'create' | 'update';
  defaultValues?: TransactionFormValues;
}

export const TRANSACTION_TYPES = {
  INCOME: 'Income',
  EXPENSE: 'Expense',
};

const TRANSACTION_CATEGORIES = {
  [TRANSACTION_TYPES.INCOME]: ['Salary', 'Bonus', 'Gift', 'Investment', 'Other'],

  [TRANSACTION_TYPES.EXPENSE]: ['Food', 'Clothes', 'Transport', 'Utilities', 'Other'],
};

function TransactionForm({ onSubmit, mode = 'create', defaultValues }: TransactionFormProps) {
  const schema = yup.object().shape({
    transactionType: yup
      .string()
      .required('Please select a transaction type')
      .oneOf(
        Object.values(TRANSACTION_TYPES),
        `should be either ${Object.values(TRANSACTION_TYPES).join(' or ')}`
      ),

    category: yup.string().required('Please select a category'),

    amount: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Must be greater than zero')
      .integer('Quantity must be a valid number')
      .typeError('Please enter a number'),

    date: yup.date().required('Please enter a date').typeError('Please enter a valid date'),
  });

  const formDefaultValues =
    mode === 'update'
      ? defaultValues
      : {
          transactionType: TRANSACTION_TYPES.INCOME,
          category: '',
          amount: 0,
          date: new Date(),
        };

  const form = useForm({
    defaultValues: formDefaultValues,
    resolver: yupResolver(schema),
  });

  // similar to useWatch hooks
  const transactionType = form.watch('transactionType');
  const { isSubmitting } = form.formState;

  useEffect(() => {
    form.setValue('category', '');
  }, [transactionType]);

  // console.log('transactionType from form', { transactionType, category });
  const handleFormSubmit = async (values: TransactionFormValues) => {
    if (onSubmit) {
      await onSubmit(values);
      form.reset();
      form.setValue('date', new Date());
    }
  };

  return (
    <Box>
      {/* {isSubmitting && <LinearProgress className={classes.progress} />} */}

      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-between',
            '& > .MuiFormControl-root': { width: '47%' },
          }}
        >
          <SelectField
            name="transactionType"
            label="Transaction Type"
            form={form}
            valueList={Object.values(TRANSACTION_TYPES)}
          />
          <SelectField
            name="category"
            label="Category"
            form={form}
            valueList={TRANSACTION_CATEGORIES[transactionType]}
          />

          <NumberField name="amount" label="Amount" form={form} />
          <DateField name="date" label="Date" form={form} />
        </Box>

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          {mode === 'create' ? 'Create a transaction' : 'Update transaction'}
        </Button>
      </form>
    </Box>
  );
}

export default TransactionForm;
