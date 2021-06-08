import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout, ButtonSpinner } from '@/components/index';
import { IUser } from '@/types/types';

const RegisterPage = () => {
  const [formInput, setFormInput] = useState<IUser>({ username: '', email: '', password: '', passwordConfirm: '' });
  const { username, email, password, passwordConfirm } = formInput;
  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      register({ username, email, password });
    } else {
      toast.error('Passwords does not match');
    }
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Layout title="User Registration - DJ Events">
        <div className="max-w-md m-auto p-5 md:p-10 shadow-lg">
          <h1 className="inline-flex">
            <FaUser className="mr-2" /> Register
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={handleChange} required />
            </div>
            <div className="mt-5">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={handleChange} required />
            </div>
            <div className="mt-5">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={handleChange} required />
            </div>
            <div className="mt-5">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={handleChange} required />
            </div>
            <ButtonSpinner text="Register" textLoading="Registering..." />
          </form>
          <div className="text-center">
            <p>Already have an account?</p>
            <Link href="/account/login">Login Here</Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;

export const getStaticProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale, ['common'])) } };
};
