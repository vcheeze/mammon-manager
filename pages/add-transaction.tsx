import Container from '@/components/container';
import TransactionForm from '@/components/transaction-form';

export default function NewEntryPage() {
  return (
    <Container className="w-full lg:w-2/4">
      <TransactionForm />
    </Container>
  );
}
