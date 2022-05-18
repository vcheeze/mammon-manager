import { Card, Heading } from 'evergreen-ui';
import { ResponsiveCalendar } from '@nivo/calendar';

function DailyTotals({ data, year }) {
  return (
    <Card height={240}>
      <Heading>Daily Totals</Heading>
      <ResponsiveCalendar
        data={data}
        from={`${year}-01-01`}
        to={`${year}-12-31`}
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={{ top: 24, right: 40, bottom: 80, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#dddddd"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            justify: false,
            itemCount: 4,
            itemWidth: 48,
            itemHeight: 32,
            itemsSpacing: 16,
            itemDirection: 'right-to-left',
            translateX: -80,
            translateY: -80,
            symbolSize: 20,
          },
        ]}
      />
    </Card>
  );
}

export default DailyTotals;
