import { useState } from 'react';
import {
  Pane,
  Alert,
  Heading,
  TextInputField,
  Button,
  ConfirmIcon,
  RefreshIcon,
  toaster,
  majorScale,
} from 'evergreen-ui';
import { HexColorPicker } from 'react-colorful';

import colors from '@/lib/colors';

export default function EntryForm() {
  const randomColor = colors[Math.floor(Math.random() * (colors.length - 1))];

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState(randomColor);
  const [submitting, setSubmitting] = useState(false);

  async function submitHandler(e) {
    setSubmitting(true);
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          color,
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
        toaster.success('Category created!');
      }
    } catch (err) {
      throw Error(err.message);
    }
  }

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
      <Heading>Add a category</Heading>
      <form onSubmit={submitHandler}>
        <Pane className="my-4">
          <TextInputField
            name="name"
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Pane>
        <Pane className="my-4 grid grid-cols-2 gap-4">
          <HexColorPicker color={color} onChange={setColor} />
          <Pane>
            <TextInputField
              name="color"
              label="Hex Code"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Button
              type="button"
              iconAfter={RefreshIcon}
              onClick={() =>
                setColor(
                  colors[Math.floor(Math.random() * (colors.length - 1))]
                )
              }
            >
              Random color
            </Button>
          </Pane>
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
