import { Outlet } from 'react-router-dom';
import Logo from '../assets/logo.png';

const AuthLayout = () => {
  return (
    <main className="min-h-screen w-full bg-[#fff9ea]">
      <div className="mx-auto grid min-h-screen w-full max-w-[1400px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <section className="hidden flex-col items-center text-center lg:flex">
          <img
            src={Logo}
            alt="Ivanka Calamansi Juice"
            className="mx-auto h-52 w-auto"
          />

          <div className="mt-12 inline-flex items-center justify-center gap-2 rounded-full bg-[#edf5d9] px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-green-900">
            <span>🌿</span>
            <span>100% Pinoy. 100% Fresh.</span>
          </div>

          <h1 className="mt-8 max-w-xl text-6xl font-black leading-[1.08] tracking-tight text-green-900">
            Freshness You Can Trust.
          </h1>

          <div className="mt-5 h-1 w-14 rounded-full bg-yellow-500" />

          <p className="mt-7 max-w-md text-base leading-8 text-zinc-700">
            Continue exploring stories, tips, and everything Ivanka Calamansi.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[520px] rounded-[2rem] border border-green-900/10 bg-white/90 p-7 shadow-2xl shadow-green-900/10 backdrop-blur sm:p-9">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;