import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout, ButtonSpinner } from '@/components/index';

const LoginPage = () => {
  const [formInput, setFormInput] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const { email, password } = formInput;
  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formInput);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  return (
    <Layout title="User Login - DJ Events">
      <div className="max-w-md m-auto p-5 md:p-10 shadow-lg">
        <h1 className="inline-flex">
          <FaUser className="mr-2" /> Login
        </h1>
        <ToastContainer position="top-center" />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={handleChange} required />
          </div>
          <div className="mt-5">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handleChange} required />
          </div>
          <ButtonSpinner text="Login" textLoading="Logging in..." />
        </form>
        <p className="text-center">
          Don't have an account? <Link href="/account/register">Register Here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;

export const getStaticProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
};
