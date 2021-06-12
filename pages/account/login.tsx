import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout, BtnSpinner } from '@/components/index';

const LoginPage = () => {
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const { email, password } = formInput;
  const { login, error } = useContext(AuthContext);
  const { t } = useTranslation('common');

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formInput);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Layout title="User Login - DJ Events">
        <div className="max-w-md m-auto p-5 md:p-10 shadow-lg">
          <h1 className="inline-flex">
            <FaUser className="mr-2" /> {t('login')}
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">{t('email')}</label>
              <input type="email" id="email" value={email} onChange={handleChange} required />
            </div>
            <div className="mt-5">
              <label htmlFor="password">{t('password')}</label>
              <input type="password" id="password" value={password} onChange={handleChange} required />
            </div>
            <BtnSpinner text={t('login')} textLoading="Logging in..." />
          </form>
          <div className="text-center">
            <p>Don't have an account?</p>
            <Link href="/account/register">{t('register')}</Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;

export const getStaticProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
};
