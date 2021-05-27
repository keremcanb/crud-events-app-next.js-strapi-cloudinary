import { useContext } from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Search } from '@/components/index';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="grid lg:grid-cols-3 place-items-center gap-3 | h:auto lg:h-16 mt-3 lg:mt-0 | shadow-md">
      <Link href="/">
        <a className="text-red-600 text-3xl font-russo-one uppercase | cursor-pointer">DJ Events</a>
      </Link>
      <Search />
      <nav>
        <ul className="flex flex-col md:flex-row place-items-center gap-3 | text-lg font-play dark:text-white | my-2">
          {/* Logged in user menu */}
          {user ? (
            <>
              <li>
                <Link href="/events">
                  <a>Events</a>
                </Link>
              </li>
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
            </>
          ) : (
            // Logged out user menu
            <li>
              <Link href="/account/login">
                <a>
                  Login
                  <FaSignInAlt className="inline-flex | ml-2 mb-0.5" />
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
