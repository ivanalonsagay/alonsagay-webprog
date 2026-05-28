import { Link, NavLink, Outlet } from 'react-router-dom';

import { getCurrentUser, getToken } from '../constants';
import Logo from '../assets/logo.png';

const navLinks = [
  {
    label: 'Home',
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

const Layout = () => {
  const token = getToken();
  const currentUser = getCurrentUser();
  const isLoggedIn = Boolean(token && currentUser);

  return (
    <div className="min-h-screen bg-[#fff9ea]">
      <header className="w-full bg-[#fff9ea]">
        <nav className="mx-auto flex h-28 w-full max-w-[1500px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link to="/" className="flex items-center gap-4">
            <img
              src={Logo}
              alt="Ivanka Calamansi Juice"
              className="h-16 w-auto object-contain"
            />

            <div className="hidden sm:block">
              <p className="text-xl font-black uppercase tracking-[0.22em] text-green-900">
                Ivanka
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-600">
                Calamansi Juice
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
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
            className="rounded-full border-2 border-green-800 px-9 py-4 text-xs font-black uppercase tracking-[0.28em] text-green-900 transition hover:bg-green-900 hover:text-white"
          >
            {isLoggedIn ? 'Dashboard' : 'Sign In'}
          </Link>
        </nav>
      </header>

      <Outlet />

      <footer className="border-t border-green-900/10 bg-[#fff9ea]">
        <div className="mx-auto w-full max-w-[1500px] px-6 py-8 text-center text-sm text-zinc-600 sm:px-10 lg:px-16">
          <p className="font-bold text-green-900">Ivanka Calamansi Juice</p>
          <p className="mt-1">Fresh, local, and proudly Pinoy.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;