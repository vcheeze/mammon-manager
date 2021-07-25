import Chart from 'react-apexcharts';

export default function PieByCategory({ data }) {
  return (
    <Chart
      type="pie"
      options={{
        labels: data.map((t) => t.category),
      }}
      series={data.map((t) => +(Math.round(t.total * 100) / 100).toFixed(2))}
    />
  );
}
