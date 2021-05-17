import { useContext } from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import styles from '@/styles/Header.module.css';
import { Search } from '@/components/index';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {/* Logged in user menu */}
          {user ? (
            <>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/events/add">
                  <a>Add Events</a>
                </Link>
              </li>
              <li>
                <button onClick={logout} className="btn-secondary btn-icon">
                  <FaSignOutAlt />
                  Logout
                </button>
                {/* <button
                  onClick={logout}
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                >
                  <FaSignOutAlt />
                  Logout
                </button> */}
              </li>
            </>
          ) : (
            // Logged out user menu
            <li>
              <Link href="/account/login">
                <a className="btn-secondary btn-icon">
                  <FaSignInAlt />
                  Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
