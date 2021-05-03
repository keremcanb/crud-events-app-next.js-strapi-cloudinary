import Layout from '@/components/Layout';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import styles from '@/styles/AuthForm.module.css';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';

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
      toast.error('Password confirm does not match');
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Registration
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" value={email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={handleChange} />
          </div>
          <input type="submit" value="Register" className="btn-info" />
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login Here</Link>
        </p>
      </div>
    </Layout>
  );
}
