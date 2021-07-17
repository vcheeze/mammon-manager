import PuffLoader from 'react-spinners/PuffLoader';

import { useCategoryTotals, useTransactionsByDay } from '@/lib/swr-hooks';
import PieByCategory from '@/components/charts/pie-by-category';

export default function DayDashboard({ date }) {
  const { categories, isLoading: isCatLoading } = useCategoryTotals(date);
  const { transactions, isLoading: isTxnLoading } = useTransactionsByDay(date);

  if (isCatLoading || isTxnLoading) return <PuffLoader loading size={150} />;
  return (
    <div className="grid grid-cols-2">
      <PieByCategory data={categories} />
      <table className="table-auto border-2">
        <thead>
          <tr>
            <th className="border p-1">Name</th>
            <th className="border p-1">Amount</th>
            <th className="border p-1">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.name}>
              <td className="border p-1">{txn.name}</td>
              <td className="border p-1">{txn.amount}</td>
              <td className="border p-1">{txn.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
