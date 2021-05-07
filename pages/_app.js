import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from 'context/AuthContext';
import '@/styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default MyApp;
