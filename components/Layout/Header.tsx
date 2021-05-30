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
      <nav className="bg-gray-800">
        <div className="px-1 md:px-5">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="text-3xl font-russo-one uppercase | cursor-pointer">DJ Events</a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Menu />
                </div>
              </div>
            </div>
            <div className="flex gap-1 md:gap-5">
              <Search />
              {user ? (
                <a>
                  <IoMdLogOut className="text-3xl" onClick={logout} />
                </a>
              ) : (
                <Link href="/account/login">
                  <a>
                    <IoMdLogIn className="text-3xl" />
                  </a>
                </Link>
              )}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <IoMdClose className="text-3xl" /> : <IoMdMenu className="text-3xl" />}
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Menu />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </header>
  );
};

export default Header;
