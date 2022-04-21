import { useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import {
  Alert,
  Button,
  ConfirmIcon,
  Heading,
  IconButton,
  majorScale,
  Pane,
  RefreshIcon,
  Table,
  TextInputField,
  toaster,
  TrashIcon,
} from 'evergreen-ui';
import { HexColorPicker } from 'react-colorful';

import colors from '@/constants/colors';
import { useCategories } from '@/lib/swr-hooks';

export default function CategoriesPage() {
  const randomColor = colors[Math.floor(Math.random() * (colors.length - 1))];

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState(randomColor);
  const [submitting, setSubmitting] = useState(false);

  const { categories, isLoading, mutate } = useCategories();

  const submitHandler = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    try {
      mutate([...categories, { name, color }], true);
      const res = await fetch('/api/category', {
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
  };

  const deleteHandler = (id) => async () => {
    try {
      mutate(
        categories.filter((c) => c.id !== id),
        false
      );
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!res.ok) {
        setShowError(true);
        setErrorMessage(json.message);
      } else {
        setShowError(false);
        toaster.success('Category deleted!');
      }
    } catch (err) {
      throw Error(err.message);
    }
  };

  if (isLoading) return <PuffLoader loading size={150} />;

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
      {/* <Pane marginTop={majorScale(4)}>
        {categories.map((category) => (
          <Badge
            key={category.id}
            color={category.color}
            marginRight={majorScale(1)}
          >
            {category.name}
          </Badge>
        ))}
      </Pane> */}
      <Table marginTop={majorScale(4)}>
        <Table.Head>
          <Table.SearchHeaderCell placeholder="Search by name..." />
          <Table.TextHeaderCell>Color</Table.TextHeaderCell>
          <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {categories.map((category) => (
            <Table.Row key={category.id}>
              <Table.TextCell>{category.name}</Table.TextCell>
              <Table.TextCell>{category.color}</Table.TextCell>
              <Table.Cell>
                <IconButton
                  icon={TrashIcon}
                  onClick={deleteHandler(category.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
