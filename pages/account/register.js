import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout } from '@/components/index';

export default function RegisterPage() {
  const [values, setValues] = useState({ username: '', email: '', password: '', passwordConfirm: '' });
  const { username, email, password, passwordConfirm } = values;
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
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  return (
    <Layout title="User Registration">
      <div className="max-w-md m-auto p-10 shadow-md">
        <h1>
          <FaUser className="inline-block" /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={handleChange} required />
          </div>
          <div className="mt-5">
            <label htmlFor="email">Email Address</label>
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
          <div className="flex justify-center my-5">
            <button className="btn-blue" type="submit">
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login Here</Link>
        </p>
      </div>
    </Layout>
  );
}
