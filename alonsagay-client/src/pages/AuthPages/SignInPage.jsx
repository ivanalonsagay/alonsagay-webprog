import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const socialButtonClassName =
  'flex w-full items-center justify-center gap-3 rounded-xl py-3 text-[11px] tracking-[0.2em]';

const AppleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-current"
    aria-hidden="true"
  >
    <path d="M16.365 1.43c0 1.14-.42 2.11-1.25 2.93-.88.86-1.88 1.36-2.98 1.28-.14-1.09.41-2.19 1.2-2.99.87-.88 2.06-1.52 3.03-1.22zM20.43 17.32c-.54 1.25-.8 1.8-1.49 2.9-.97 1.47-2.33 3.31-4.02 3.33-1.5.02-1.89-.98-3.93-.97-2.04.01-2.47 1-3.97.98-1.69.01-2.98-1.67-3.95-3.14-2.7-4.12-2.98-8.95-1.32-11.52 1.18-1.83 3.05-2.9 4.81-2.9 1.79 0 2.92.99 4.4.99 1.44 0 2.32-.99 4.39-.99 1.57 0 3.23.85 4.4 2.33-3.87 2.12-3.24 7.65.68 8.99z" />
  </svg>
);

const GoogleIcon = () => (
  <span className="text-base font-black normal-case tracking-normal text-zinc-900">
    G
  </span>
);

const SignInPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Log In
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Access your account using the same monochrome wireframe language used
        across the site.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-zinc-700"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            type="email"
            placeholder="Placeholder"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>

          <input
            id="signin-password"
            type="password"
            placeholder="Placeholder"
            autoComplete="current-password"
            className={inputClasses}
          />

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="font-medium text-zinc-700 transition hover:text-zinc-900"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={socialButtonClassName}
          >
            <GoogleIcon />
            <span>Google</span>
          </Button>

          <Button
            type="button"
            variant="secondary"
            className={socialButtonClassName}
          >
            <AppleIcon />
            <span>Apple</span>
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-zinc-900 transition hover:text-zinc-600"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;