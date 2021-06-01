import { useState, useContext } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { IoMdMenu, IoMdClose, IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import { Search, Menu } from '@/components/index';
import AuthContext from '@/context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="bg-gray-800 px-2">
        {/* Full menu */}
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <a className="text-3xl font-russo-one uppercase cursor-pointer">DJ Events</a>
              </Link>
            </div>
            {/* Menu */}
            <div className="hidden lg:block">
              <Menu />
            </div>
          </div>

          {/* Right section */}
          <div className="flex gap-2">
            {/* Search */}
            <div className="invisible lg:visible">
              <Search />
            </div>
            {/* Auth */}
            {user ? (
              <a className="cursor-pointer">
                <IoMdLogOut className="text-3xl" onClick={logout} />
              </a>
            ) : (
              <Link href="/account/login">
                <a className="inline-flex gap-1">
                  Login <IoMdLogIn className="text-3xl" />
                </a>
              </Link>
            )}
            {/* Hamburger menu */}
            <div className="flex lg:hidden">
              {/* Button props */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex place-items-center | bg-gray-900 hover:bg-gray-800 | p-2 rounded-md | text-gray-400 hover:text-white | focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Button icons */}
                {isOpen ? (
                  <IoMdClose className="text-3xl" aria-hidden="true" />
                ) : (
                  <IoMdMenu className="text-3xl" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="lg:hidden" id="mobile-menu">
            {/* Menu */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Menu />
              {/* Search */}
              <div className="max-w-max pt-2 pl-2">
                <Search />
              </div>
            </div>
          </div>
        </Transition>
      </nav>
    </header>
  );
};

export default Header;
