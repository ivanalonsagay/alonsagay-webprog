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

      <Outlet />

      <footer className="bg-[#053d25] text-white">
        <div className="mx-auto grid w-full max-w-[1500px] gap-8 px-6 py-8 sm:px-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr] lg:px-16">
          <div>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
              Fresh, local, and proudly Pinoy calamansi juice made for everyday
              refreshment.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80 transition hover:border-yellow-300 hover:text-yellow-300"
              >
                Facebook
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80 transition hover:border-yellow-300 hover:text-yellow-300"
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80 transition hover:border-yellow-300 hover:text-yellow-300"
              >
                TikTok
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-yellow-400">
              Pages
            </h3>

            <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
              <Link to="/" className="transition hover:text-yellow-300">
                Home
              </Link>

              <Link to="/about" className="transition hover:text-yellow-300">
                About
              </Link>

              <Link to="/articles" className="transition hover:text-yellow-300">
                Articles
              </Link>

              <Link to="/signin" className="transition hover:text-yellow-300">
                Sign In
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-yellow-400">
              Dashboard
            </h3>

            <div className="mt-4 flex flex-col gap-2 text-sm text-white/75">
              <Link to="/dashboard" className="transition hover:text-yellow-300">
                Dashboard
              </Link>

              <Link
                to="/dashboard/articles"
                className="transition hover:text-yellow-300"
              >
                Manage Articles
              </Link>

              <Link
                to="/dashboard/reports"
                className="transition hover:text-yellow-300"
              >
                Reports
              </Link>

              <Link
                to="/dashboard/users"
                className="transition hover:text-yellow-300"
              >
                Users
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-yellow-400">
              Contact
            </h3>

            <div className="mt-4 space-y-2 text-sm leading-6 text-white/75">
              <p>Sampaloc, Manila, Philippines</p>

              <p>
                <a
                  href="tel:09123456789"
                  className="transition hover:text-yellow-300"
                >
                  0912 345 6789
                </a>
              </p>

              <p>
                <a
                  href="mailto:ivankacalamansi@example.com"
                  className="transition hover:text-yellow-300"
                >
                  ivankacalamansi@example.com
                </a>
              </p>

              <p>Monday to Saturday, 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center justify-between gap-3 px-6 py-4 text-center text-xs text-white/60 sm:px-10 md:flex-row lg:px-16">
            <p>
              © {new Date().getFullYear()} Ivanka Calamansi Juice. All rights
              reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/about" className="transition hover:text-yellow-300">
                Product Info
              </Link>

              <Link to="/articles" className="transition hover:text-yellow-300">
                Latest Articles
              </Link>

              <Link to="/signin" className="transition hover:text-yellow-300">
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;