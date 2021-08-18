import { Pane } from 'evergreen-ui';

import Container from '@/components/container';
import CategoryForm from '@/components/category-form';

export default function NewCategoryPage() {
  return (
    <Pane>
      <Container>
        <CategoryForm />
      </Container>
    </Pane>
  );
}
