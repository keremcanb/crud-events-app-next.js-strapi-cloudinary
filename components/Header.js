import { useContext } from 'react';
import Link from 'next/link';
import { FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Search } from '@/components/index';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center h-15 px-20 shadow-md">
      <Link href="/">
        <h1>
          <a className="uppercase text-red-600">DJ Events</a>
        </h1>
      </Link>
      <Search />
      <nav>
        <ul className="flex justify-center items-center gap-3">
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {/* Logged in user menu */}
          {user ? (
            <div className="flex justify-center items-center gap-3">
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <FaSignOutAlt onClick={logout} className="cursor-pointer" />
              </li>
            </div>
          ) : (
            // Logged out user menu
            <li>
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
