import '../styles/index.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
