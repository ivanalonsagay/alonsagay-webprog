import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // your logo

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'bg-green-900 text-white'
      : 'bg-transparent text-green-900 hover:bg-green-100 hover:text-green-800',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Navbar background: semi-transparent with blur */}
      <div className="backdrop-blur-sm bg-[#fdf7e7]/80">
        <div className="mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-22 object-contain" />
          </NavLink>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;