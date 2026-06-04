import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserService from '../../services/userService';
import Logo from '../../assets/logo.png';

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
    if (!/^\d+$/.test(form.age)) {
      return 'Age must be a number only.';
    }

    if (!/^\d{11}$/.test(form.contactNumber)) {
      return 'Contact number must be exactly 11 digits.';
    }

    if (/\s/.test(form.username)) {
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
    <main className="min-h-screen bg-[#fff9ea]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1300px] items-center gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_560px] lg:px-16">
        <section className="hidden h-full flex-col justify-center lg:flex">
          <Link to="/" className="w-fit">
            <img
              src={Logo}
              alt="Ivanka Calamansi Juice"
              className="h-40 w-80 object-contain"
            />
          </Link>

          <h1 className="mt-8 max-w-[620px] text-5xl font-black leading-[1.05] tracking-tight text-green-950 xl:text-6xl">
            Join the Ivanka dashboard team.
          </h1>

          <div className="mt-6 h-1 w-16 rounded-full bg-yellow-500" />

          <p className="mt-7 max-w-[520px] text-lg leading-8 text-zinc-700">
            Sign up to access dashboard tools. New accounts are created as
            editors by default.
          </p>

        </section>

        <section className="mx-auto w-full max-w-[560px] rounded-[2rem] border border-green-900/10 bg-white p-8 shadow-2xl shadow-green-900/10 sm:p-10">
          <div className="mb-8 flex justify-center">
            <Link to="/" className="inline-flex flex-col items-center">


            </Link>
          </div>

          <h2 className="text-center text-4xl font-black text-green-950">
            Sign Up
          </h2>

          <p className="mt-3 text-center text-sm leading-6 text-zinc-600">
            Create your editor account.
          </p>

          {error ? (
            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {success}
            </div>
          ) : null}

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="h-14 rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
                required
              />

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="h-14 rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Age"
                className="h-14 rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
                required
              />

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="h-14 rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="Contact number"
              className="h-14 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="h-14 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
              required
            />

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="h-14 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="h-14 rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="h-14 rounded-xl border border-zinc-200 px-4 text-sm outline-none transition focus:border-green-800"
                required
              />
            </div>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              rows="3"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-green-800"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="h-14 w-full rounded-xl bg-green-900 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-600">
            Already have an account?{' '}
            <Link
              to="/auth/signin"
              className="font-black text-green-900 hover:underline"
            >
              Sign In
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

export default SignUpPage;