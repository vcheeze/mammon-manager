import Chart from 'react-apexcharts';

export default function PieByCategory({ data }) {
  return data.length > 0 ? (
    <Chart
      type="pie"
      options={{
        labels: data.map((t) => t.category),
      }}
      series={data.map((t) => +(Math.round(t.total * 100) / 100).toFixed(2))}
    />
  ) : (
    <h1>No Transactions!</h1>
  );
}
