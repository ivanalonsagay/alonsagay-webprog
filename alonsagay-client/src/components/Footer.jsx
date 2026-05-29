import { Link } from 'react-router-dom';

import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#053d25] text-white">
      <div className="mx-auto grid w-full max-w-[1500px] gap-8 px-6 py-8 sm:px-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr] lg:px-16">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img
              src={Logo}
              alt="Ivanka Calamansi Juice"
              className="block h-16 w-auto object-contain"
            />
          </Link>

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
            <p>Quezon City, Philippines</p>

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
                href="mailto:ivankaalonsagay@gmail.com"
                className="transition hover:text-yellow-300"
              >
                ivankaalonsagay@gmail.com
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
  );
};

export default Footer;