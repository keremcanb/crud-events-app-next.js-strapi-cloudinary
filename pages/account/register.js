import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Layout } from '@/components/index';
import styles from '@/styles/AuthForm.module.css';

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
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={handleChange} required />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit">Register</button>
          </div>
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login Here</Link>
        </p>
      </div>
    </Layout>
  );
}
