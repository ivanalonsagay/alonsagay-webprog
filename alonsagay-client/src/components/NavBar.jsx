import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { getCurrentUser, getToken } from '../constants';
import Logo from '../assets/logo.png';

const navLinks = [
  {
    name: 'Home',
    path: '/',
    end: true,
  },
  {
    name: 'About',
    path: '/about',
    end: false,
  },
  {
    name: 'Articles',
    path: '/articles',
    end: false,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = getToken();
  const currentUser = getCurrentUser();
  const isLoggedIn = Boolean(token && currentUser);

  const mainButtonText = isLoggedIn ? 'Dashboard' : 'Sign In';
  const mainButtonPath = isLoggedIn ? '/dashboard' : '/auth/signin';

  const navLinkClass = ({ isActive }) =>
    [
      'rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-[0.28em] transition',
      isActive
        ? 'bg-green-900 text-white shadow-md shadow-green-900/20'
        : 'text-green-900 hover:bg-green-900/10',
    ].join(' ');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fff9ea]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Ivanka Calamansi Juice"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end}
              className={navLinkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            to={mainButtonPath}
            className="inline-flex items-center justify-center rounded-full border-2 border-green-800 bg-transparent px-7 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-green-900 transition hover:bg-green-900 hover:text-white"
          >
            {mainButtonText}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-green-900/20 text-2xl text-green-900 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-green-900/10 bg-[#fff9ea]/95 px-5 py-5 shadow-lg shadow-green-900/5 backdrop-blur-md sm:px-8 lg:hidden">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.end}
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to={mainButtonPath}
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-green-900 px-7 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-md shadow-green-900/20 transition hover:bg-green-800"
            >
              {mainButtonText}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;