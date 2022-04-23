import { useState } from 'react';
import { format } from 'date-fns';
import PuffLoader from 'react-spinners/PuffLoader';
import {
  Pane,
  Alert,
  Heading,
  TextInputField,
  FormField,
  Combobox,
  Button,
  ConfirmIcon,
  toaster,
  majorScale,
} from 'evergreen-ui';

import { useCurrencies, useCategories } from '@/lib/swr-hooks';
import Container from '@/components/container';

export default function AddTransactionPage() {
  const { currencies, isLoading: isCurLoading } = useCurrencies();
  const { categories, isLoading: isCatLoading } = useCategories();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [currency, setCurrency] = useState('AED');
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submitHandler(e) {
    setSubmitting(true);
    e.preventDefault();
    try {
      const res = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          amount,
          date,
          currency,
          category,
        }),
      });
      setSubmitting(false);
      const json = await res.json();
      if (!res.ok) {
        setShowError(true);
        setErrorMessage(json.message);
      } else {
        setShowError(false);
        setName('');
        toaster.success('Transaction created!');
      }
    } catch (err) {
      throw Error(err.message);
    }
  }

  if (isCurLoading || isCatLoading) return <PuffLoader loading size={150} />;

  return (
    <Container className="w-full lg:w-2/4">
      <Pane>
        {showError && (
          <Alert
            intent="danger"
            title="Oops, something went wrong"
            marginBottom={majorScale(2)}
            isRemoveable
            onRemove={() => setShowError(false)}
          >
            {errorMessage}
          </Alert>
        )}
        <Heading>Add a transaction</Heading>
        <form onSubmit={submitHandler}>
          <div className="my-4">
            <TextInputField
              name="name"
              label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="my-4">
            <TextInputField
              name="amount"
              label="Amount"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
          <div className="my-4">
            <TextInputField
              name="date"
              label="Date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="my-4">
            <FormField label="Currency" isRequired>
              <Combobox
                width="100%"
                initialSelectedItem={{
                  label: 'United Arab Emirates Dirham (AED)',
                  value: 'AED',
                }}
                items={currencies.map((c) => ({
                  label: `${c.currencyName} (${c.currencyCode})`,
                  value: c.currencyCode,
                }))}
                itemToString={(item) => (item ? item.label : '')}
                onChange={(value) => setCurrency(value.value)}
              />
            </FormField>
          </div>
          <div className="my-4">
            <FormField label="Category" isRequired>
              <Combobox
                width="100%"
                items={categories.map((c) => c.name)}
                onChange={(value) => setCategory(value)}
              />
            </FormField>
          </div>
          <Button
            type="submit"
            isLoading={submitting}
            appearance="primary"
            intent="success"
            iconAfter={ConfirmIcon}
          >
            {submitting ? 'Creating ...' : 'Create'}
          </Button>
        </form>
      </Pane>
    </Container>
  );
}
