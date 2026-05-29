import { Link } from 'react-router-dom';

import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#053d25] text-white">
      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-6 py-10 sm:px-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr] lg:px-16">
        <div>
          <Link to="/" className="inline-flex items-center">
            <img
              src={Logo}
              alt="Ivanka Calamansi Juice"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
            Fresh, local, and proudly Pinoy calamansi juice made for everyday
            refreshment.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/80 transition hover:border-yellow-300 hover:text-yellow-300"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/80 transition hover:border-yellow-300 hover:text-yellow-300"
            >
              Instagram
            </a>

            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/80 transition hover:border-yellow-300 hover:text-yellow-300"
            >
              TikTok
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
            Pages
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
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
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
            Explore
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            <Link to="/" className="transition hover:text-yellow-300">
              Fresh Taste
            </Link>

            <Link to="/about" className="transition hover:text-yellow-300">
              Our Product
            </Link>

            <Link to="/articles" className="transition hover:text-yellow-300">
              Calamansi Tips
            </Link>

            <Link to="/signup" className="transition hover:text-yellow-300">
              Create Account
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
            Contact
          </h3>

          <div className="mt-5 space-y-3 text-sm leading-7 text-white/75">
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
        <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center justify-between gap-4 px-6 py-5 text-center text-xs text-white/60 sm:px-10 md:flex-row lg:px-16">
          <p>
            © {new Date().getFullYear()} Ivanka Calamansi Juice. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
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