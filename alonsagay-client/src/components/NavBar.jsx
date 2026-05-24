import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../assets/logo.png';

const navLinks = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Articles',
    path: '/articles',
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-[0.28em] transition ${
      isActive
        ? 'bg-green-900 text-white shadow-md shadow-green-900/20'
        : 'text-green-900 hover:bg-green-900/10'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fff9ea]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Ivanka Calamansi Juice"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-3 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Sign In */}
        <div className="hidden lg:block">
          <Link
            to="/signin"
            className="inline-flex items-center justify-center rounded-full border-2 border-green-800 bg-transparent px-7 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-green-900 transition hover:bg-green-900 hover:text-white"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-green-900/20 text-2xl text-green-900 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-green-900/10 bg-[#fff9ea]/95 px-5 py-5 shadow-lg shadow-green-900/5 backdrop-blur-md sm:px-8 lg:hidden">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-green-900 px-7 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-md shadow-green-900/20 transition hover:bg-green-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;