import PuffLoader from 'react-spinners/PuffLoader';
import { format } from 'date-fns';
import { Table, InlineAlert } from 'evergreen-ui';

import { useTransactionsByMonth } from '@/lib/swr-hooks';
import AllTxns from '@/components/charts/all-txns';

export default function MonthDashboard({ month }) {
  const { transactions, isLoading } = useTransactionsByMonth(month);

  if (isLoading) return <PuffLoader loading size={150} />;
  return transactions.length > 0 ? (
    <div>
      <AllTxns data={transactions} />
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell placeholder="Search by name..." />
          <Table.TextHeaderCell>Amount</Table.TextHeaderCell>
          <Table.TextHeaderCell>Category</Table.TextHeaderCell>
          <Table.TextHeaderCell>Date</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {transactions.map((txn) => (
            <Table.Row key={txn.id}>
              <Table.TextCell>{txn.name}</Table.TextCell>
              <Table.TextCell>{txn.amount}</Table.TextCell>
              <Table.TextCell>{txn.Category}</Table.TextCell>
              <Table.TextCell>
                {format(new Date(txn.date), 'MMMM do, yyyy')}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ) : (
    <InlineAlert intent="warning">No Transactions!</InlineAlert>
  );
}
