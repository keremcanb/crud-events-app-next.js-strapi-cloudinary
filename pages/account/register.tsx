import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout, Button } from '@/components/index';
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
    <Layout title="User Registration - DJ Events">
      <div className="max-w-md m-auto p-5 md:p-10 shadow-lg">
        <h1 className="inline-flex">
          <FaUser className="mr-2" /> Register
        </h1>
        <ToastContainer position="top-center" />
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
          <Button color="blue" text="Register" />
        </form>
        <p className="text-center">
          Already have an account? <Link href="/account/login">Login Here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
