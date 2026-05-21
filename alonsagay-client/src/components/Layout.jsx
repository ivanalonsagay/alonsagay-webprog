import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer'; // import your footer

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#fdf7e7] text-zinc-900 flex flex-col">
      <NavBar />
      <main className="pt-20 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;