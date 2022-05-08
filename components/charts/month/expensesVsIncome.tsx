import { Table, majorScale } from 'evergreen-ui';
import { ResponsiveBar } from '@nivo/bar';
import { reduce, omit, union } from 'lodash';

function ExpensesVsIncome({ data }) {
  const totalExpenses =
    reduce(omit(data[0], 'type'), (result, value) => result + value) || 0;
  const totalIncome =
    reduce(omit(data[1], 'type'), (result, value) => result + value) || 0;
  const delta = totalIncome - totalExpenses;
  const savingsRate = delta ? (delta / totalIncome) * 100 : 0;

  return (
    <>
      <Table marginTop={majorScale(2)}>
        <Table.Body>
          <Table.Row>
            <Table.TextCell>Expenses</Table.TextCell>
            <Table.TextCell>
              {totalExpenses.toLocaleString()} AED
            </Table.TextCell>
          </Table.Row>
          <Table.Row>
            <Table.TextCell>Income</Table.TextCell>
            <Table.TextCell>{totalIncome.toLocaleString()} AED</Table.TextCell>
          </Table.Row>
          <Table.Row intent={delta > 0 ? 'success' : 'danger'}>
            <Table.TextCell>+/-</Table.TextCell>
            <Table.TextCell>{delta.toLocaleString()} AED</Table.TextCell>
          </Table.Row>
          <Table.Row intent={savingsRate > 30 ? 'success' : 'danger'}>
            <Table.TextCell>Savings Rate</Table.TextCell>
            <Table.TextCell>{savingsRate.toFixed(2)}%</Table.TextCell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div style={{ height: '250px' }}>
        <ResponsiveBar
          data={data}
          keys={union(Object.keys(data[0]), Object.keys(data[1])).filter(
            (key) => key !== 'type'
          )}
          indexBy="type"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          layout="horizontal"
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
          enableGridX
          enableGridY={false}
          label={(d) => `${d.value} AED`}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          role="application"
          ariaLabel="Sum by Category"
          barAriaLabel={(e) =>
            `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
          }
        />
      </div>
    </>
  );
}

export default ExpensesVsIncome;
