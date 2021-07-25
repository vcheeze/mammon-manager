import Chart from 'react-apexcharts';

export default function AllTxns({ data }) {
  return (
    <Chart
      type="line"
      options={{
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Month',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: data.map((t) => t.name),
        },
      }}
      series={[
        {
          name: 'AED',
          data: data.map((t) => +(Math.round(t.amount * 100) / 100).toFixed(2)),
        },
      ]}
    />
  );
}
