import { useState } from 'react';
import { format } from 'date-fns';
import { partition, map, groupBy, sumBy, mapValues } from 'lodash';
import { Pane, TextInputField, majorScale, Heading } from 'evergreen-ui';

import { useBudgetsByMonth } from '@/lib/swr-hooks/budget';
import { useTransactionsByMonth } from '@/lib/swr-hooks/transaction';
import Loader from '@/components/loader';
import Container from '@/components/container';
import ExpensesByDate from '@/components/charts/month/expensesByDate';
import ExpensesVsIncome from '@/components/charts/month/expensesVsIncome';
import BudgetProgress from '@/components/charts/month/budgetProgress';
import { chartColors } from '../constants/colors';
// import { MonthDashboard } from '@/components/dashboard';

export default function VizPage() {
  const today = new Date();
  const [month, setMonth] = useState(format(today, 'yyyy-MM'));

  const { budgets, isLoading: isBudLoading } = useBudgetsByMonth(month);
  const { transactions, isLoading: isTxnLoading } =
    useTransactionsByMonth(month);

  if (isBudLoading || isTxnLoading) return <Loader loading />;

  let expensesByDay = [];
  let exVsIn = [];
  let budgetsProgress = [];
  if (budgets.length > 0 && transactions.length > 0) {
    // split transactions by type
    const [expenses, income] = partition(transactions, ['type', 'expense']);
    const expensesByCategory = mapValues(
      groupBy(expenses, 'category'),
      (data) => sumBy(data, 'amount')
    );

    // expense from each day of the month
    expensesByDay = map(groupBy(expenses, 'date'), (data) => ({
      x: format(new Date(data[0].date), 'yyyy-MM-dd'),
      y: sumBy(data, 'amount'),
    })).sort((a, b) => (a.x > b.x ? 1 : -1));

    // get summed expenses and income
    exVsIn = [
      {
        type: 'Expenses',
        ...expensesByCategory,
      },
      {
        type: 'Income',
        ...mapValues(groupBy(income, 'category'), (data) =>
          sumBy(data, 'amount')
        ),
      },
    ];

    // progress of budgets
    budgetsProgress = budgets.map((budget) => ({
      amount: budget.amount,
      category: budget.category,
      currency: budget.currency,
      spent: expensesByCategory[budget.category],
    }));
  }

  return (
    <Container className="w-full lg:w-3/4">
      <Pane marginBottom={majorScale(2)}>
        <div className="grid grid-cols-2 my-2">
          <TextInputField
            name="month"
            label="Select Month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      </Pane>
      {expensesByDay.length > 0 && (
        <Pane>
          <Heading>Transaction Trend</Heading>
          <ExpensesByDate
            data={[
              {
                id: 'Total Per Day',
                data: expensesByDay,
              },
            ]}
          />
        </Pane>
      )}
      {exVsIn.length > 0 && (
        <Pane>
          <Heading>Expenses vs. income</Heading>
          <ExpensesVsIncome data={exVsIn} />
        </Pane>
      )}
      {budgetsProgress.length > 0 && (
        <Pane>
          <Heading>Budget Progress</Heading>
          {budgetsProgress.map((bp, index) => (
            <BudgetProgress
              key={bp.category}
              data={bp}
              color={chartColors[index]}
            />
          ))}
        </Pane>
      )}
    </Container>
  );
}
