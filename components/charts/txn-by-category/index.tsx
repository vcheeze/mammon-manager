import Chart from 'react-apexcharts'
import PuffLoader from 'react-spinners/PuffLoader'

import { useTxnByCategory } from '@/lib/swr-hooks'

export default function TxnByCategory() {
  const { transactions, isLoading } = useTxnByCategory();

  if (isLoading) return <PuffLoader loading size={150} />
  return (
    <Chart
      type="pie"
      options={{
        labels: transactions.map(t => t.category)
      }}
      series={transactions.map(t => +(Math.round(t.total * 100) / 100).toFixed(2))}
    />
  )
}
