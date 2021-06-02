import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
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

export default appWithTranslation(MyApp);
