import { useState } from 'react';
import Router from 'next/router';
import { format } from 'date-fns';
import {
  TextInputField,
  Autocomplete,
  Button,
  ConfirmIcon,
} from 'evergreen-ui';

export default function EntryForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  // const [category, setCategory] = useState('');
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
        {/* <label htmlFor="name" className="font-bold">
          Name
        </label>
        <input
          id="name"
          className="shadow border rounded w-full p-2"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
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
        {/* <label htmlFor="amount" className="font-bold">
          Amount
        </label>
        <input
          id="amount"
          className="shadow border rounded w-full p-2"
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        /> */}
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
        {/* <label htmlFor="date" className="font-bold">
          Date
        </label>
        <input
          id="date"
          className="shadow border rounded w-full p-2"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        /> */}
      </div>
      <div className="my-4">
        <Autocomplete
          title="Categories"
          items={['1', '2', '3']}
          onChange={(e) => console.log('e :>> ', e)}
        >
          {(props) => {
            const { getInputProps, getRef, inputValue, openMenu } = props;
            /* eslint-disable react/jsx-props-no-spreading */
            return (
              <TextInputField
                label="Category"
                value={inputValue}
                ref={getRef}
                {...getInputProps({
                  onFocus: () => {
                    openMenu();
                  },
                })}
              />
            );
            /* eslint-enable react/jsx-props-no-spreading */
          }}
        </Autocomplete>
        {/* <label htmlFor="category" className="font-bold">
          Category
        </label>
        <input
          id="category"
          className="shadow border rounded w-full p-2"
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /> */}
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
