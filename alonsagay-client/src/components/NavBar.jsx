import { Link, NavLink } from 'react-router-dom';

import { getCurrentUser, getToken } from '../constants';
import Logo from '../assets/logo.png';

const navLinks = [
  {
    label: 'Home ',
    to: '/',
    end: true,
  },
  {
    label: 'About',
    to: '/about',
    end: false,
  },
  {
    label: 'Articles',
    to: '/articles',
    end: false,
  },
];

const Navbar = () => {
  const token = getToken();
  const currentUser = getCurrentUser();
  const isLoggedIn = Boolean(token && currentUser);

  return (
    <header className="w-full border-b border-green-900/10 bg-[#fff9ea]">
      <nav className="mx-auto flex h-24 w-full max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Ivanka Calamansi Juice"
            className="block h-16 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'rounded-full px-6 py-3 text-xs font-black uppercase tracking-[0.35em] transition',
                  isActive
                    ? 'bg-green-900 text-white shadow-lg shadow-green-900/20'
                    : 'text-green-900 hover:bg-green-900/10',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to={isLoggedIn ? '/dashboard' : '/signin'}
          className="rounded-full border-2 border-green-800 px-8 py-3 text-xs font-black uppercase tracking-[0.24em] text-green-900 transition hover:bg-green-900 hover:text-white"
        >
          {isLoggedIn ? 'Dashboard' : 'Sign In'}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;