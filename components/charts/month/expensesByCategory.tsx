import { ResponsivePie } from '@nivo/pie';

function ExpensesByCategory({ data }) {
  return (
    <div style={{ height: '480px' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        valueFormat=" >-,.2f"
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
        ]}
        fill={[
          {
            match: {
              id: 'Eating Out',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Groceries',
            },
            id: 'dots',
          },
        ]}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 16,
            itemsSpacing: 8,
            itemWidth: 100,
            itemHeight: 24,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default ExpensesByCategory;
