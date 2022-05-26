import { useState } from 'react';
import { format } from 'date-fns';
import {
  Pane,
  Alert,
  Heading,
  TextInputField,
  FormField,
  Combobox,
  Checkbox,
  Button,
  ConfirmIcon,
  toaster,
  majorScale,
} from 'evergreen-ui';

import { useCategories } from '@/lib/swr-hooks/category';
import { useCurrencies } from '@/lib/swr-hooks/miscellaneous';
import Loader from '@/components/loader';

export default function AddTransactionPage() {
  const { currencies, isLoading: isCurLoading } = useCurrencies();
  const { categories, isLoading: isCatLoading } = useCategories();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isIncome, setIsIncome] = useState(false);
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
          type: isIncome ? 'income' : 'expense',
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

  if (isCurLoading || isCatLoading) return <Loader loading />;

  return (
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
        <Pane className="my-4 grid grid-cols-2 gap-4">
          <TextInputField
            name="name"
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInputField
            name="amount"
            label="Amount"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
          <TextInputField
            name="date"
            label="Date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <FormField label="Currency" isRequired>
            <Combobox
              width="100%"
              initialSelectedItem="AED"
              items={currencies}
              onChange={(value) => setCurrency(value.value)}
            />
          </FormField>
          <FormField label="Category" isRequired>
            <Combobox
              width="100%"
              items={categories.map((c) => c.name).sort()}
              onChange={(value) => setCategory(value)}
            />
          </FormField>
          <FormField>
            <Checkbox
              label="Is Income"
              checked={isIncome}
              onChange={(e) => setIsIncome(e.target.checked)}
            />
          </FormField>
        </Pane>
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
  );
}
