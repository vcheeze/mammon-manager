import { useState } from 'react';
import { format } from 'date-fns';
import { partition, map, groupBy, sumBy, mapValues, isEmpty } from 'lodash';
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
import {
  ExpensesByDate,
  ExpensesVsIncome,
  BudgetProgress,
  ExpensesByCategory,
} from '@/components/charts';
import { chartColors } from '@/constants/colors';

function MonthDashboard() {
  const today = new Date('2022-04-01'); // TODO remove hardcoded date
  const [month, setMonth] = useState(format(today, 'yyyy-MM'));

  // fetch data
  const { budgets, isLoading: isBudLoading } = useBudgetsByMonth(month);
  const { transactions, isLoading: isTxnLoading } =
    useTransactionsByMonth(month);

  // process data
  let expensesByDay = [];
  let exVsIn = [];
  let budgetsProgress = [];
  let expensesByCategory = {};
  if (budgets && transactions) {
    // split transactions by type
    const [expenses, income] = partition(transactions, ['type', 'expense']);
    // group expenses by category and sum
    expensesByCategory = mapValues(groupBy(expenses, 'category'), (data) =>
      sumBy(data, 'amount')
    );

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
              ...expensesByCategory,
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

    // progress of budgets
    budgetsProgress = budgets.map((budget) => ({
      amount: budget.amount,
      category: budget.category,
      currency: budget.currency,
      spent: expensesByCategory[budget.category] || 0,
    }));
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
      {!isEmpty(expensesByCategory) && (
        <Card>
          <Heading>Expenses by Category</Heading>
          <ExpensesByCategory
            data={Object.entries(expensesByCategory).map(
              ([key, value]: [string, number], index) => ({
                id: key,
                label: key,
                value: value.toFixed(2),
                color: chartColors[index % 6],
              })
            )}
          />
        </Card>
      )}
      {exVsIn.length > 0 && (
        <Card>
          <Heading>Expenses vs. income</Heading>
          <ExpensesVsIncome data={exVsIn} />
        </Card>
      )}
      {budgetsProgress.length > 0 && (
        <Card>
          <Heading>Budget Progress</Heading>
          {budgetsProgress.map((bp, index) => (
            <BudgetProgress
              key={bp.category}
              data={bp}
              color={chartColors[index % 6]}
            />
          ))}
        </Card>
      )}
    </Pane>
  );
}

export default MonthDashboard;
