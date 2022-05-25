import Link from 'next/link';
import Image from 'next/image';
import { majorScale, Pane } from 'evergreen-ui';

function Footer() {
  return (
    <footer>
      <Pane background="blueTint" padding={majorScale(4)} textAlign="right">
        <Link href="https://github.com/vcheeze/mammon-manager" passHref>
          <Image
            src="/GitHub-Mark-32px.png"
            width={majorScale(3)}
            height={majorScale(3)}
            alt="GitHub repo"
          />
        </Link>
      </Pane>
    </footer>
  );
}

export default Footer;
