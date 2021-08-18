import PuffLoader from 'react-spinners/PuffLoader';
import { useState } from 'react';
import Router from 'next/router';
import { format } from 'date-fns';
import {
  TextInputField,
  FormField,
  Combobox,
  Button,
  ConfirmIcon,
} from 'evergreen-ui';

import { useCategories } from '@/lib/swr-hooks';

export default function EntryForm() {
  const { categories, isLoading } = useCategories();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [category, setCategory] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submitHandler(e) {
    setSubmitting(true);
    e.preventDefault();
    try {
      const res = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          amount,
          date,
          category,
        }),
      });
      setSubmitting(false);
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      Router.push('/');
    } catch (err) {
      throw Error(err.message);
    }
  }

  if (isLoading) return <PuffLoader loading size={150} />;

  return (
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
          onChange={(e) => setAmount(e.target.value)}
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
  );
}
