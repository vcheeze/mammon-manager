import Link from 'next/link';
import {
  majorScale,
  Pane,
  Card,
  Link as Anchor,
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
        <Link href="/" passHref>
          <Anchor>
            <Heading>Mammon Manager</Heading>
          </Anchor>
        </Link>
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
