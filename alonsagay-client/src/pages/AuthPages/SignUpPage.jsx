import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import UserService from '../../services/userService';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'male',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setError('');
    setSuccess('');
  };

  const validate = () => {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';

    if (!/^\d+$/.test(form.age.trim())) {
      return 'Age must be a number only.';
    }

    if (!/^\d{11}$/.test(form.contactNumber.trim())) {
      return 'Contact number must be exactly 11 digits.';
    }

    if (/\s/.test(form.username.trim())) {
      return 'Username must not contain spaces.';
    }

    if (form.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      // ENHANCEMENT 3:
      // SignUp now works by creating a real user account.
      await UserService.register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender,
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        password: form.password,
        address: form.address.trim(),
        role: 'editor',
        isActive: true,
      });

      setSuccess('Account created successfully. Redirecting to sign in...');

      setTimeout(() => {
        navigate('/auth/signin');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Unable to create account.');
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
            Join the Ivanka Community.
          </h1>

          <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

          <p className="mt-7 max-w-md text-base leading-8 text-zinc-700">
            Create an account and enjoy dashboard access, reports, article
            records, and fresh Ivanka updates.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[560px] rounded-[2rem] border border-green-900/10 bg-white/90 p-7 shadow-2xl shadow-green-900/10 backdrop-blur sm:p-9">
          <div className="mb-8 flex justify-center lg:hidden">
            <img
              src={Logo}
              alt="Ivanka Calamansi Juice"
              className="mx-auto h-20 w-auto"
            />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-green-900">
            Sign up
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Create your account to get started.
          </p>

          {error ? (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {success}
            </div>
          ) : null}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="h-14 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
                required
              />

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="h-14 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="h-14 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
                required
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="h-14 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <input
              type="text"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="09123456789"
              className="h-14 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="h-14 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
              required
            />

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="h-14 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="h-14 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="h-14 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-green-800"
                required
              />
            </div>

            <p className="-mt-2 text-xs leading-5 text-zinc-500">
              Password must be at least 8 characters. Contact number must be 11
              digits. Username must not contain spaces.
            </p>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              rows="3"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-800"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="h-14 w-full rounded-xl bg-green-900 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-9 text-center text-sm text-zinc-600">
            Already have an account?{' '}
            <Link
              to="/auth/signin"
              className="font-black text-green-900 underline-offset-4 hover:underline"
            >
              Sign in
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

export default SignUpPage;