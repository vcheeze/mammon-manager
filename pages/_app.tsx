import '../styles/index.css';
import Footer from '@/components/footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
