import { useState } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import PuffLoader from 'react-spinners/PuffLoader';
import {
  Alert,
  Button,
  ConfirmIcon,
  Heading,
  IconButton,
  majorScale,
  Pane,
  Table,
  FormField,
  Combobox,
  TextInputField,
  toaster,
  TrashIcon,
} from 'evergreen-ui';

import { useCategories } from '@/lib/swr-hooks/category';
import { useBudgets } from '@/lib/swr-hooks/budget';
import { useCurrencies } from '@/lib/swr-hooks/miscellaneous';

export default function BudgetsPage() {
  const { categories, isLoading: isCatLoading } = useCategories();
  const { currencies, isLoading: isCurLoading } = useCurrencies();
  const { budgets, isLoading: isBudLoading, mutate } = useBudgets();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [currency, setCurrency] = useState('AED');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    try {
      const newBudget = {
        category,
        amount,
        startDate: startOfMonth(new Date(month)),
        endDate: endOfMonth(new Date(month)),
        currency,
        name,
      };
      mutate([...budgets, newBudget], true);
      const res = await fetch('/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBudget),
      });
      setSubmitting(false);
      const json = await res.json();
      if (!res.ok) {
        setShowError(true);
        setErrorMessage(json.message);
      } else {
        setShowError(false);
        setCategory('');
        setAmount(0);
        setName('');
        toaster.success('Budget created!');
      }
    } catch (err) {
      throw Error(err.message);
    }
  };

  const deleteHandler = (id) => async () => {
    try {
      mutate(
        budgets.filter((c) => c.id !== id),
        false
      );
      const res = await fetch(`/api/budget/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!res.ok) {
        setShowError(true);
        setErrorMessage(json.message);
      } else {
        setShowError(false);
        toaster.success('Budget deleted!');
      }
    } catch (err) {
      throw Error(err.message);
    }
  };

  if (isCatLoading || isCurLoading || isBudLoading)
    return <PuffLoader loading size={150} />;

  return (
    <>
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

        <Heading>Add a budget</Heading>
        <form onSubmit={submitHandler}>
          <Pane className="my-4 grid grid-cols-2 gap-4">
            <FormField label="Category" isRequired>
              <Combobox
                width="100%"
                items={categories.map((c) => c.name)}
                onChange={(value) => setCategory(value)}
              />
            </FormField>
            <TextInputField
              name="amount"
              label="Amount"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
            <TextInputField
              name="month"
              label="Month"
              type="month"
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
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
            <TextInputField
              name="color"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
      <Table marginTop={majorScale(4)}>
        <Table.Head>
          <Table.SearchHeaderCell placeholder="Search by name..." />
          <Table.TextHeaderCell>Amount</Table.TextHeaderCell>
          <Table.TextHeaderCell>Month</Table.TextHeaderCell>
          <Table.TextHeaderCell>Category</Table.TextHeaderCell>
          <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {budgets.map((budget) => (
            <Table.Row key={budget.id}>
              <Table.TextCell>{budget.name}</Table.TextCell>
              <Table.TextCell>{budget.amount}</Table.TextCell>
              <Table.TextCell>
                {format(new Date(budget.startDate), 'MMMM yyyy')}
              </Table.TextCell>
              <Table.TextCell>{budget.Category}</Table.TextCell>
              <Table.Cell>
                <IconButton
                  icon={TrashIcon}
                  onClick={deleteHandler(budget.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
