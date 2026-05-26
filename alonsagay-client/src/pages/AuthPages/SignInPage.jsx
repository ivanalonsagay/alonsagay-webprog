import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import UserService from '../../services/userService';
import { clearAuth, saveAuth } from '../../constants';

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
      clearAuth();

      const data = await UserService.login({
        emailOrUsername: form.emailOrUsername.trim(),
        password: form.password,
      });

      // ENHANCEMENT 1:
      // Viewers cannot log in.
      if (data.user?.role === 'viewer') {
        clearAuth();
        setError('Viewers are not allowed to log in.');
        return;
      }

      saveAuth({
        token: data.token,
        user: data.user,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#fff9ea]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <section className="hidden flex-col items-center text-center lg:flex">
          <img
            src={Logo}
            alt="Ivanka Calamansi Juice"
            className="mx-auto h-56 w-auto"
          />

          <div className="mt-16 inline-flex items-center justify-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
            <span>🌿</span>
            <span>100% Pinoy. 100% Fresh.</span>
          </div>

          <h1 className="mt-8 max-w-xl text-6xl font-black leading-[1.08] tracking-tight text-green-900">
            Freshness You Can Trust.
          </h1>

          <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

          <p className="mt-7 max-w-md text-base leading-8 text-zinc-700">
            Welcome back! Sign in to continue exploring Ivanka stories,
            dashboard tools, reports, and user records.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[460px] rounded-[2rem] border border-green-900/10 bg-white/90 p-7 shadow-2xl shadow-green-900/10 backdrop-blur sm:p-9">
          <div className="mb-8 flex justify-center lg:hidden">
            <img
              src={Logo}
              alt="Ivanka Calamansi Juice"
              className="mx-auto h-20 w-auto"
            />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-green-900">
            Sign in
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Use your email or username to access your account.
          </p>

          {error ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="emailOrUsername"
                className="text-sm font-bold text-zinc-900"
              >
                Email or username
              </label>

              <input
                id="emailOrUsername"
                type="text"
                name="emailOrUsername"
                value={form.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="mt-2 h-14 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-800 shadow-sm outline-none placeholder:text-zinc-400 focus:border-green-800"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-bold text-zinc-900"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-2 h-14 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-800 shadow-sm outline-none placeholder:text-zinc-400 focus:border-green-800"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-14 w-full rounded-xl bg-green-900 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-9 text-center text-sm text-zinc-600">
            Do not have an account?{' '}
            <Link
              to="/auth/signup"
              className="font-black text-green-900 underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-zinc-600">
            <Link
              to="/"
              className="font-bold text-green-900 underline-offset-4 hover:underline"
            >
              Back to home
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignInPage;