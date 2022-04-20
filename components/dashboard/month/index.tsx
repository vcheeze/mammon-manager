import PuffLoader from 'react-spinners/PuffLoader';
import { format } from 'date-fns';
import { InlineAlert } from 'evergreen-ui';

import { useTransactionsByMonth } from '@/lib/swr-hooks';
import AllTxns from '@/components/charts/all-txns';

export default function MonthDashboard({ month }) {
  const { transactions, isLoading } = useTransactionsByMonth(month);

  if (isLoading) return <PuffLoader loading size={150} />;
  return transactions.length > 0 ? (
    <div>
      <AllTxns data={transactions} />
      <table className="table-auto border-2">
        <thead>
          <tr>
            <th className="border p-1">Name</th>
            <th className="border p-1">Amount</th>
            <th className="border p-1">Category</th>
            <th className="border p-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.name}>
              <td className="border p-1">{txn.name}</td>
              <td className="border p-1">{txn.amount}</td>
              <td className="border p-1">{txn.category}</td>
              <td className="border p-1">
                {format(new Date(txn.date), 'MMMM do, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <InlineAlert intent="warning">No Transactions!</InlineAlert>
  );
}
