import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'context/AuthContext';
import { EventsProvider } from 'context/EventsContext';
import '@/styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <AuthProvider>
    <EventsProvider>
      <Component {...pageProps} />
    </EventsProvider>
  </AuthProvider>
);

export default MyApp;
