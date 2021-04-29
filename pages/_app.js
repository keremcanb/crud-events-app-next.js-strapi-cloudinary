import '@/styles/globals.css';
import { AuthProvider } from 'context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default MyApp;
