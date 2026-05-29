import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff9ea] px-5 py-10">
      <section className="w-full max-w-6xl rounded-[2rem] border border-green-900/10 bg-white/70 px-6 py-20 text-center shadow-2xl shadow-green-900/10 sm:px-10">
        <div className="mx-auto inline-flex rounded-full bg-[#edf5d9] px-6 py-2 text-xs font-black uppercase tracking-[0.25em] text-green-900">
          Page Not Found
        </div>

        <h1 className="mt-8 text-8xl font-black leading-none text-green-900 sm:text-9xl">
          404
        </h1>

        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-yellow-500" />

        <h2 className="mt-8 text-4xl font-black text-green-900 sm:text-5xl">
          Oops! This page went missing.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-600">
          The page you are looking for does not exist, may have been moved, or
          the link may be incorrect. Let&apos;s bring you back to something
          fresh.
        </p>

        <Link
          to="/"
          className="mt-9 inline-flex items-center justify-center rounded-full bg-green-900 px-9 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800"
        >
          Back Home
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;