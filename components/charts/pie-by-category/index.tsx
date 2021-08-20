// import Chart from 'react-apexcharts';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

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
