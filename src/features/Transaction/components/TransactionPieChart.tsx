import { TransactionTypeValues, ValueOf } from '@types';
import { defaultTheme } from 'app/theme';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectTotalExpense, selectTotalIncome, selectTransactions } from '../selectors';
import { TransactionItem } from '../transactionSlice';
import * as colors from '@mui/material/colors';
import { Box, Divider, Stack, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionPieChartProps = {
  transactionType: ValueOf<TransactionTypeValues>;
};

function TransactionPieChart({ transactionType }: TransactionPieChartProps) {
  const allTransactions = useSelector(selectTransactions);

  const transactionTypeTotal = useSelector(
    transactionType === 'Income' ? selectTotalIncome : selectTotalExpense
  );

  type CategoryGroup = Record<string, TransactionItem[]>;

  const categoryGroups = allTransactions
    .filter((item) => item.transactionType === transactionType)
    .reduce((groups, item) => {
      const group = groups[item.category] || [];
      group.push(item);
      groups[item.category] = group;
      return groups;
    }, {} as CategoryGroup);

  // type TransactionChartData = {
  //   labels: string[];
  //   dataValues: number[];
  // };

  const pieChartData = {
    labels: [] as string[],
    dataValues: [] as number[],
    bgColors: [] as string[],
  };

  for (const [category, items] of Object.entries(categoryGroups)) {
    const { labels, dataValues } = pieChartData;
    const categorySubTotal = items.reduce((total, item) => total + item.amount, 0);

    labels.push(category);
    dataValues.push(categorySubTotal);
  }
  type ColorShadeKey = keyof typeof colors.grey;

  for (let i = 0; i < pieChartData.labels.length; i++) {
    const shade = ((i + 1) * 200) as ColorShadeKey;
    const color = transactionType === 'Income' ? colors.green[shade] : colors.red[shade];

    pieChartData.bgColors.push(color);
  }

  const data = {
    labels: pieChartData.labels,
    datasets: [
      {
        label: '# of Votes',
        data: pieChartData.dataValues,
        backgroundColor: pieChartData.bgColors,
        borderColor: pieChartData.bgColors,
        borderWidth: 5,
        weight: 1.2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <Stack sx={{ height: '100%', textAlign: 'center' }}>
      <Typography variant="h5" component="h3" fontWeight={400}>
        {transactionType}
      </Typography>
      <Divider />
      <Typography variant="h5" component="h6" fontWeight={400} fontSize={20}>
        ${transactionTypeTotal}
      </Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Pie data={data} options={options} />
      </Box>
    </Stack>
  );
}

export default TransactionPieChart;
