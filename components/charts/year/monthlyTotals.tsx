import { Card } from 'evergreen-ui';
import { ResponsiveBar } from '@nivo/bar';

function MonthlyTotals({ data }) {
  return (
    <Card height={480}>
      <ResponsiveBar
        data={data}
        keys={['total']}
        indexBy="month"
        margin={{ top: 64, right: 64, bottom: 64, left: 80 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat=" >-,.2f"
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
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Total',
          legendPosition: 'middle',
          legendOffset: -64,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        role="application"
        ariaLabel="Monthly Totals"
      />
    </Card>
  );
}

export default MonthlyTotals;
