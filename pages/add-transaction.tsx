import { Pane, Heading } from 'evergreen-ui';

import Container from '@/components/container';
import TransactionForm from '@/components/transaction-form';

export default function NewEntryPage() {
  return (
    <Pane>
      <Container className="w-full lg:w-2/4">
        <Heading>Add a transaction</Heading>
        <TransactionForm />
      </Container>
    </Pane>
  );
}
