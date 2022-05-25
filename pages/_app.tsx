import { Pane } from 'evergreen-ui';

import '../styles/index.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Sidebar from '@/components/sidebar';
import Container from '@/components/container';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Pane display="flex">
        <Sidebar />
        <Container>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Container>
      </Pane>
      <Footer />
    </>
  );
}

export default MyApp;
