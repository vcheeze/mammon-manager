import { useRouter } from 'next/router';

import { useTransaction } from '@/lib/swr-hooks';
import Container from '@/components/container';

export default function EditEntryPage() {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useTransaction(id);

  if (data) {
    return (
      <Container>
        <h1 className="font-bold text-3xl my-2">{data.name}</h1>
        <p>{data.amount}</p>
        <p>{data.date}</p>
        <p>{data.category}</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="font-bold text-3xl my-2">...</h1>
      <p>...</p>
    </Container>
  );
}
