import Button from '../components/Button';

const NotFoundPage = () => (
  <main className="min-h-screen w-full bg-[#fff9ea]">
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] items-center justify-center px-5 py-16 sm:px-8 lg:px-12">
      <section className="relative w-full overflow-hidden rounded-[2rem] border border-green-900/10 bg-[#fffdf5] p-8 text-center shadow-2xl shadow-green-900/10 sm:p-12 lg:p-16">
        <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-green-900/10 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-yellow-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
            <span>Page Not Found</span>
          </div>

          <h1 className="text-7xl font-black leading-none tracking-tight text-green-900 sm:text-8xl lg:text-9xl">
            404
          </h1>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-yellow-500" />

          <h2 className="mt-7 text-3xl font-black leading-tight text-green-900 sm:text-4xl lg:text-5xl">
            Oops! This page went missing.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg">
            The page you are looking for does not exist, may have been moved, or
            the link may be incorrect. Let’s bring you back to something fresh.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button
              to="/"
              className="!inline-flex !items-center !justify-center !gap-3 !rounded-full !border-0 !bg-green-900 !px-9 !py-4 !text-xs !font-black !uppercase !tracking-[0.18em] !text-white !shadow-lg !shadow-green-900/25 hover:!bg-green-800"
            >
              Back Home
            </Button>

          </div>

          
        </div>
      </section>
    </div>
  </main>
);

export default NotFoundPage;