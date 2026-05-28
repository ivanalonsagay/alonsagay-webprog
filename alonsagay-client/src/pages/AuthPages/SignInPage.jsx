import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserService from '../../services/userService';
import { saveAuth } from '../../constants';
import Logo from '../../assets/logo.png';

const SignInPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError('');

      const data = await UserService.login(form);

      const user = data.user || data.data?.user;
      const token = data.token || data.data?.token || user?.token;

      if (!user || !token) {
        throw new Error('Login response is missing user data.');
      }

      if (String(user.role || '').toLowerCase() === 'viewer') {
        throw new Error('Viewers are not allowed to log in.');
      }

      if (user.isActive === false) {
        throw new Error('Your account is inactive.');
      }

      saveAuth({
        token,
        user,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fff9ea]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1300px] items-center gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_460px] lg:px-16">
        <section className="hidden h-full flex-col justify-center lg:flex">
          <Link to="/" className="w-fit">
            <img
              src={Logo}
              alt="Ivanka Calamansi Juice"
              className="h-50 w-80 object-contain"
            />
          </Link>



          <h1 className="mt-8 max-w-[620px] text-5xl font-black leading-[1.05] tracking-tight text-green-950 xl:text-6xl">
            Manage fresh content with a clean dashboard.
          </h1>

          <div className="mt-6 h-1 w-16 rounded-full bg-yellow-500" />

          <p className="mt-7 max-w-[520px] text-lg leading-8 text-zinc-700">
            Sign in to manage users, articles, reports, and dashboard records
            for the Ivanka Calamansi Juice website.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[460px] rounded-[2rem] border border-green-900/10 bg-white p-8 shadow-2xl shadow-green-900/10 sm:p-10">
          <div className="mb-8 flex justify-center">
            <Link to="/" className="inline-flex flex-col items-center">
         
            </Link>
          </div>

          <h2 className="text-center text-4xl font-black text-green-950">
            Sign In
          </h2>

          <p className="mt-3 text-center text-sm leading-6 text-zinc-600">
            Use your admin or editor account to continue.
          </p>

          {error ? (
            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-bold text-zinc-900">
                Email or Username
              </label>

              <input
                type="text"
                name="emailOrUsername"
                value={form.emailOrUsername}
                onChange={handleChange}
                className="mt-2 h-14 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
                placeholder="Enter email or username"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-zinc-900">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-2 h-14 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-14 w-full rounded-xl bg-green-900 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-600">
            No account yet?{' '}
            <Link
              to="/signup"
              className="font-black text-green-900 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <div className="mt-5 text-center">
            <Link
              to="/"
              className="text-xs font-black uppercase tracking-[0.16em] text-green-900 hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignInPage;