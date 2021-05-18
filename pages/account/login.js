import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout } from '@/components/index';

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' });
  const { email, password } = values;
  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = (e) => {
    e.preventDefault();
    login(values);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  return (
    <Layout title="User Login">
      <div className="max-w-md m-auto p-10 shadow-md">
        <h1>
          <FaUser className="inline-block" /> Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={handleChange} required />
          </div>
          <div className="mt-5">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handleChange} required />
          </div>
          <div className="flex justify-center my-5">
            <button className="btn-blue" type="submit">
              Login
            </button>
          </div>
        </form>
        {/* <p>
          Forgot your password? <Link href="/account/register">Reset Here</Link>
        </p> */}
        <p>
          Don't have an account? <Link href="/account/register">Register Here</Link>
        </p>
      </div>
    </Layout>
  );
}
