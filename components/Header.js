import { useContext } from 'react';
import Link from 'next/link';
import { FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Search } from '@/components/index';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex flex-col lg:flex-row justify-between items-center gap-3 | bg-white text-black shadow-md | h:auto lg:h-16 px-20 mt-3 lg:mt-0">
      <Link href="/">
        <a className="uppercase cursor-pointer text-red-600 text-3xl font-russo-one">DJ Events</a>
      </Link>
      <Search />
      <nav>
        <ul className="flex flex-col lg:flex-row justify-center items-center gap-3 | text-lg mb-2 lg:mb-0 font-play">
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
