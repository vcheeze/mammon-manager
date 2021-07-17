import Skeleton from 'react-loading-skeleton';

import Container from '@/components/container';
import Entries from '@/components/entries';

import { useTransactions } from '@/lib/swr-hooks';

export default function IndexPage() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div>
        <Container>
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
          <div className="my-4" />
          <Skeleton width={180} height={24} />
          <Skeleton height={48} />
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <Entries entries={transactions} />
      </Container>
    </div>
  );
}
