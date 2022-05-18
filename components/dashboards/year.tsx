import { useState } from 'react';
import { format } from 'date-fns';
import { partition, map, groupBy, sumBy } from 'lodash';
import { Pane, majorScale, Card, IconButton, MoreIcon } from 'evergreen-ui';

import { useTransactionsByYear } from '@/lib/swr-hooks/transaction';
import Loader from '@/components/loader';
import YearPicker from '@/components/yearPicker';
import { DailyTotals, MonthlyTotals } from '@/components/charts';

function YearDashboard() {
  const today = new Date();
  const [year, setYear] = useState(+format(today, 'yyyy'));
  const onYearChange = (value) => setYear(value);

  const { transactions, isLoading } = useTransactionsByYear(year.toString());

  let monthlyTotals = [];
  let dailyTotals = [];
  if (transactions?.length > 0) {
    // split transactions by type
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [expenses, income] = partition(transactions, ['type', 'expense']);

    monthlyTotals = map(
      groupBy(expenses, (ex) => format(new Date(ex.date), 'LLLL')),
      (data) => ({
        month: format(new Date(data[0].date), 'LLLL'),
        total: sumBy(data, 'amount'),
      })
    );
    dailyTotals = map(groupBy(expenses, 'date'), (data) => ({
      day: format(new Date(data[0].date), 'yyyy-MM-dd'),
      value: sumBy(data, 'amount'),
    }));
  }

  if (isLoading) return <Loader loading />;

  return (
    <Pane
      elevation={1}
      margin={majorScale(2)}
      padding={majorScale(2)}
      background="tint1"
    >
      <Card>
        <div className="grid grid-cols-2 my-2">
          <YearPicker onChange={onYearChange} />
          <IconButton icon={MoreIcon} appearance="minimal" />
        </div>
      </Card>
      <DailyTotals data={dailyTotals} year={year} />
      <MonthlyTotals data={monthlyTotals} />
    </Pane>
  );
}

export default YearDashboard;
