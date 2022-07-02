import '../styles/globals.css'
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Component {...pageProps} />

  );
}

export default MyApp
