import { AppProps } from 'next/app';
import { AuthProvider } from 'context/AuthContext';
import { EventsProvider } from 'context/EventsContext';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import '@/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <EventsProvider>
      <Component {...pageProps} />
    </EventsProvider>
  </AuthProvider>
);

export default MyApp;
