import { NavLink } from 'react-router-dom';

import Logo from '../assets/logo.png';

const navLinks = [
  {
    label: 'Home',
    to: '/home',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Articles',
    to: '/articles',
  },
];

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#fff9ea]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <NavLink to="/home" className="inline-flex items-center">
          <img
            src={Logo}
            alt="Ivanka Calamansi Juice"
            className="h-12 w-auto"
          />
        </NavLink>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.25em] transition',
                  isActive
                    ? 'bg-green-900 text-white'
                    : 'text-green-900 hover:bg-green-900 hover:text-white',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/dashboard"
          className="hidden rounded-full border-2 border-green-800 px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-green-900 transition hover:bg-green-900 hover:text-white md:inline-flex"
        >
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;