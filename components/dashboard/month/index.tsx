import PuffLoader from 'react-spinners/PuffLoader';

import { useTransactionsByMonth } from '@/lib/swr-hooks';
import AllTxns from '@/components/charts/all-txns';

export default function MonthDashboard({ month }) {
  const { transactions, isLoading } = useTransactionsByMonth(month);

  if (isLoading) return <PuffLoader loading size={150} />;
  return <AllTxns data={transactions} />;
}
