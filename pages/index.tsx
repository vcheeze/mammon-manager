import { Pane, Heading, Paragraph, Text, majorScale } from 'evergreen-ui';

import Container from '@/components/container';

export default function IndexPage() {
  return (
    <div>
      <Pane>
        <Container>
          <Heading size={600} marginTop={majorScale(3)}>
            Welcome to Mammon Manager
          </Heading>
          <Paragraph marginTop={majorScale(6)} marginBottom={majorScale(6)}>
            Mammon Manager is designed to help you manage your finance.
          </Paragraph>
        </Container>
        <Pane className="grid grid-cols-2">
          <Pane
            background="blue600"
            height={majorScale(32)}
            padding={majorScale(2)}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="gray50">Build your own budget.</Text>
          </Pane>
          <Pane
            background="blue200"
            height={majorScale(32)}
            padding={majorScale(2)}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text>View charts and graphs!</Text>
          </Pane>
        </Pane>
        <Container>
          <Paragraph marginTop={majorScale(6)}>
            And that&apos;s that. Try it out!
          </Paragraph>
        </Container>
      </Pane>
    </div>
  );
}
