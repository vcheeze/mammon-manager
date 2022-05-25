import { useRouter } from 'next/router';
import Link from 'next/link';
import { Pane, TabNavigation, SidebarTab, majorScale } from 'evergreen-ui';

function Sidebar() {
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
    <Pane width={320} borderRight="muted" padding={majorScale(2)}>
      <TabNavigation marginX={-4} marginBottom={16}>
        {routes.map((r) => (
          <Link href={r.path} key={r.name} passHref>
            <SidebarTab
              is="a"
              href={r.path}
              id={r.name}
              isSelected={router.pathname === r.path}
            >
              {r.name}
            </SidebarTab>
          </Link>
        ))}
      </TabNavigation>
    </Pane>
  );
}

export default Sidebar;
