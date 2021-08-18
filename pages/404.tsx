import { Pane, Link } from 'evergreen-ui';
import Image from 'next/image';

export default function PageNotFound() {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src="/404.gif" width={500} height={500} alt="Page Not Found" />
      <Link href="https://storyset.com/web" color="neutral">
        Web illustrations by Storyset
      </Link>
    </Pane>
  );
}
