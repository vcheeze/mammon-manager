import '../styles/index.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Container from '@/components/container';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Container>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}

export default MyApp;
