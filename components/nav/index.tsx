/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { majorScale, Pane, Link as Anchor } from 'evergreen-ui';

import Container from '@/components/container';

export default function Nav() {
  const routes = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Visualizations',
      path: '/viz',
    },
    {
      name: 'Add Transaction',
      path: '/add-transaction',
    },
    {
      name: 'Categories',
      path: '/categories',
    },
    {
      name: 'Budgets',
      path: '/budgets',
    },
  ];

  const router = useRouter();

  return (
    <Pane borderBottom padding={majorScale(1)} marginBottom={majorScale(4)}>
      <Container className="py-2">
        <nav>
          {routes.map((r) => (
            <Link href={r.path} passHref key={r.name}>
              <Anchor
                marginRight={majorScale(2)}
                textDecoration="none"
                color={router.pathname === r.path ? '' : 'neutral'}
              >
                {r.name}
              </Anchor>
            </Link>
          ))}
        </nav>
      </Container>
    </Pane>
  );
}
