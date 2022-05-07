import { useState } from 'react';
import { format } from 'date-fns';
import { partition, map, groupBy, sumBy, mapValues } from 'lodash';
import {
  Pane,
  majorScale,
  Card,
  TextInputField,
  Heading,
  StatusIndicator,
  Button,
} from 'evergreen-ui';

import { useBudgetsByMonth } from '@/lib/swr-hooks/budget';
import { useTransactionsByMonth } from '@/lib/swr-hooks/transaction';
import Loader from '@/components/loader';
import ExpensesByDate from '@/components/charts/month/expensesByDate';
import ExpensesVsIncome from '@/components/charts/month/expensesVsIncome';

function MonthDashboard() {
  const today = new Date();
  const [month, setMonth] = useState(format(today, 'yyyy-MM'));

  const { budgets, isLoading: isBudLoading } = useBudgetsByMonth(month);
  const { transactions, isLoading: isTxnLoading } =
    useTransactionsByMonth(month);

  let expensesByDay = [];
  let exVsIn = [];
  if (budgets && transactions) {
    console.log('budgets :>> ', budgets);
    console.log('transactions :>> ', transactions);
    // split transactions by type
    const [expenses, income] = partition(transactions, ['type', 'expense']);

    // expense from each day of the month
    expensesByDay = map(groupBy(expenses, 'date'), (data) => ({
      x: format(new Date(data[0].date), 'yyyy-MM-dd'),
      y: sumBy(data, 'amount'),
    })).sort((a, b) => (a.x > b.x ? 1 : -1));

    // get summed expenses and income
    exVsIn = [
      ...(expenses.length > 0
        ? [
            {
              type: 'Expenses',
              ...mapValues(groupBy(expenses, 'category'), (data) =>
                sumBy(data, 'amount')
              ),
            },
          ]
        : []),
      ...(income.length > 0
        ? [
            {
              type: 'Income',
              ...mapValues(groupBy(income, 'category'), (data) =>
                sumBy(data, 'amount')
              ),
            },
          ]
        : []),
    ];
  }

  if (isBudLoading || isTxnLoading) return <Loader loading />;

  return (
    <Pane
      elevation={1}
      margin={majorScale(2)}
      padding={majorScale(2)}
      background="tint1"
    >
      <Card>
        <div className="grid grid-cols-2 my-2">
          <TextInputField
            name="month"
            label="Select Month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      </Card>
      {expensesByDay.length < 1 && exVsIn.length < 1 && (
        <Card>
          <StatusIndicator color="warning">
            You have no data yet for this month.
          </StatusIndicator>
          <Button
            marginLeft={majorScale(2)}
            onClick={() => {
              window.location.href = '/add-transaction';
            }}
          >
            Add some now!
          </Button>
        </Card>
      )}
      {expensesByDay.length > 0 && (
        <Card>
          <Heading>Transaction Trend</Heading>
          <ExpensesByDate
            data={[
              {
                id: 'Total Per Day',
                data: expensesByDay,
              },
            ]}
          />
        </Card>
      )}
      {exVsIn.length > 0 && (
        <Card>
          <Heading>Expenses vs. income</Heading>
          <ExpensesVsIncome data={exVsIn} />
        </Card>
      )}
    </Pane>
  );
}

export default MonthDashboard;
