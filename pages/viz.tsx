import { useState } from 'react';
import { format } from 'date-fns';
import { map, groupBy, sumBy } from 'lodash';
import { Pane, TextInputField, majorScale } from 'evergreen-ui';
import PuffLoader from 'react-spinners/PuffLoader';
import { ResponsiveBar } from '@nivo/bar';

import Container from '@/components/container';
import { useBudgetsByMonth } from '@/lib/swr-hooks/budget';
import { useTransactionsByMonth } from '@/lib/swr-hooks/transaction';
// import { MonthDashboard } from '@/components/dashboard';

export default function VizPage() {
  const today = new Date();
  const [month, setMonth] = useState(format(today, 'yyyy-MM'));

  const { budgets, isLoading: isBudLoading } = useBudgetsByMonth(month);
  const { transactions, isLoading: isTxnLoading } =
    useTransactionsByMonth(month);

  if (isBudLoading || isTxnLoading) return <PuffLoader loading size={150} />;

  let groupedTransactions = [];
  if (budgets && transactions) {
    groupedTransactions = map(groupBy(transactions, 'Category'), (data) => ({
      category: data[0].Category,
      spent: sumBy(data, 'amount'),
    }));
    groupedTransactions = groupedTransactions.map((group) => {
      const budget = budgets.find((b) => b.Category === group.category);
      return {
        ...group,
        remaining: budget.amount - group.spent,
      };
    });
  }

  return (
    <Container className="w-full lg:w-3/4">
      <Pane background="tint1" marginBottom={majorScale(2)}>
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
      <div style={{ height: '500px' }}>
        <ResponsiveBar
          data={groupedTransactions}
          keys={['spent', 'remaining']}
          indexBy="category"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Category',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Amount',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          label={(d) => `${d.value} AED`}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Sum by Category"
          barAriaLabel={(e) =>
            `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
          }
        />
      </div>
      {/* <MonthDashboard month={month} /> */}
    </Container>
  );
}
