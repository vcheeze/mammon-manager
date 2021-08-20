import { majorScale, Pane, Paragraph } from 'evergreen-ui';

import Container from '@/components/container';

function Footer() {
  return (
    <Pane background="blueTint" marginTop={majorScale(8)}>
      <Container>
        <footer className="flex justify-center items-center h-24">
          <Paragraph>Footer placeholder</Paragraph>
        </footer>
      </Container>
    </Pane>
  );
}

export default Footer;
