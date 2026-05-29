import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const SignUpPage = () => (
  <main className="min-h-screen w-full bg-[#fff9ea]">
    <div className="mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
      {/* Left Content */}
      <section className="hidden flex-col items-center text-center lg:flex">
        <img
          src={Logo}
          alt="Ivanka Calamansi Juice"
          className="mx-auto h-60 w-auto"
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
          Create an account and enjoy fresh stories, local goodness, and updates
          made for you.
        </p>
      </section>

      {/* Form Card */}
      <section className="mx-auto w-full max-w-[460px] rounded-[2rem] border border-green-900/10 bg-white/90 p-7 shadow-2xl shadow-green-900/10 backdrop-blur sm:p-9">
        <div className="mb-8 flex justify-center lg:hidden">
          <img
            src={Logo}
            alt="Ivanka Calamansi Juice"
            className="mx-auto h-20 w-auto"
          />
        </div>

        <div>
          <h2 className="text-4xl font-black tracking-tight text-green-900">
            Sign up
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Create your account to get started.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-bold text-zinc-900">Full name</label>

            <div className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 text-zinc-500 shadow-sm focus-within:border-green-800">
              <input
                type="text"
                placeholder="Enter your full name"
                className="h-full w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-zinc-900">
              Email address
            </label>

            <div className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 text-zinc-500 shadow-sm focus-within:border-green-800">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-full w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-zinc-900">Password</label>

            <div className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 text-zinc-500 shadow-sm focus-within:border-green-800">
              <input
                type="password"
                placeholder="Create a password"
                className="h-full w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Use 8 or more characters with a mix of letters and numbers.
            </p>
          </div>

          <div>
            <label className="text-sm font-bold text-zinc-900">
              Confirm password
            </label>

            <div className="mt-2 flex h-14 items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 text-zinc-500 shadow-sm focus-within:border-green-800">
              <input
                type="password"
                placeholder="Confirm your password"
                className="h-full w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm leading-6 text-zinc-600">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-zinc-300 accent-green-900"
            />
            <span>
              I agree to the{' '}
              <a
                href="#"
                className="font-bold text-green-900 underline-offset-4 hover:underline"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="font-bold text-green-900 underline-offset-4 hover:underline"
              >
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            className="h-14 w-full rounded-xl bg-green-900 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
          >
            Create account
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-200" />
        </div>


        <p className="mt-9 text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="font-black text-green-900 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>
    </div>
  </main>
);

export default SignUpPage;