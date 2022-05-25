import Link from 'next/link';
import {
  majorScale,
  Pane,
  Card,
  Heading,
  IconButton,
  UserIcon,
  CogIcon,
} from 'evergreen-ui';

function Nav() {
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      borderBottom
      paddingTop={majorScale(1)}
      paddingBottom={majorScale(1)}
      paddingRight={majorScale(2)}
      paddingLeft={majorScale(2)}
    >
      <Card display="flex" alignItems="center">
        <Heading>Mammon Manager</Heading>
      </Card>
      <Card>
        <Link href="/profile" passHref>
          <IconButton appearance="minimal" icon={UserIcon} />
        </Link>
        <Link href="/settings" passHref>
          <IconButton appearance="minimal" icon={CogIcon} />
        </Link>
      </Card>
    </Pane>
  );
}

export default Nav;
