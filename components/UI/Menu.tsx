import { useContext } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';

const Menu = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Link href="/events">
        <a>Events</a>
      </Link>
      {user && (
        <>
          <Link href="/account/dashboard">
            <a>Dashboard</a>
          </Link>
          <Link href="/events/add">
            <a>Add Event</a>
          </Link>
        </>
      )}
    </>
  );
};

export default Menu;
